"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { pool } from '../db'; // Import the existing connection pool
// import {db} from '@vercel/postgres';

interface Params {
    id?: string;
    title: string;
    image: string;
    description: string;
    rules: string;
    settings: string;
    specification: string;
    trade: string;
    download: string | undefined;
    specificationLink: string | undefined;
    changelog: string | undefined;
    changelogLink: string | undefined;
    category: string;
    path: string;
}



export async function createTemplate({ title, image, description, settings, download, trade, rules, specification, specificationLink, changelog, changelogLink, category, path }: Params) {
    // const pool = await db.connect()
    const { has } = auth();
    const canManage = has({permission:"org:mod:change"});
    if(!canManage) return null
    try {
        await pool.query(
            `INSERT INTO h3_szablony.templates (title, image, description, settings, download, trade, rules, specification, specificationLink, changelog, changelogLink)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [title, image, description, settings, download, trade, rules, specification, specificationLink, changelog, changelogLink, category]
        );
        revalidatePath(path);
    } catch (error) {
        throw new Error(`Failed to create template: ${error.message}`);
    }
}

export async function editTemplate({ id, title, image, description, settings, download, trade, rules, specification, specificationLink, changelog, changelogLink, category, path }: Params) {
    // const pool = await db.connect()
    const { has } = auth();
    const canManage = has({permission:"org:mod:change"});
    if(!canManage) return null
    try {
        await pool.query(
            `UPDATE h3_szablony.templates 
             SET title = $2, image = $3, description = $4, settings = $5, download = $6, trade = $7, rules = $8, specification = $9, specificationLink = $10, changelog = $11, changelogLink = $12, category = $13
             WHERE id = $1`,
            [id, title, image, description, settings, download, trade, rules, specification, specificationLink, changelog, changelogLink, category]
        );
        revalidatePath(path);
    } catch (error) {
        throw new Error(`Failed to edit template: ${error.message}`);
    }
}


export async function fetchTemplates() {
    // const pool = await db.connect()
    try {
        const result = await pool.query(`SELECT * FROM h3_szablony.templates ORDER BY LOWER(title)`);
        return result.rows;
    } catch (error) {
        throw new Error(`Failed to fetch templates: ${error.message}`);
    }
}


export async function fetchVersionById(versionId) {
    // const pool = await db.connect()
    try {
        const result = await pool.query(`SELECT * FROM h3_szablony.template_versions WHERE id = $1 ORDER BY version`, [versionId]);
        return result.rows
    } catch (error) {
        throw new Error(`Failed to fetch version: ${error.message}`);
    }
}


export async function fetchTemplateById(template_id) {
    // const pool = await db.connect()
    try {
        const templateQuery = `SELECT * FROM h3_szablony.templates WHERE id = $1`;
        const templateResult = await pool.query(templateQuery, [template_id]);
        const template = templateResult.rows[0];

        if (!template) {
            throw new Error(`Template with ID ${template_id} not found`);
        }

        const templateVersionsQuery = `SELECT * FROM h3_szablony.template_versions WHERE template_id = $1`;
        const templateVersionsResult = await pool.query(templateVersionsQuery, [template_id]);
        const templateVersions = templateVersionsResult.rows;

        return {template, templateVersions}
    } catch (error) {
        throw new Error(`Failed to fetch template: ${error.message}`);
    }
}


interface Params2 {
    versionId?: string;
    version: string;
    image: string;
    changes: string;
    download: string;
    path: string;
    template_id?: string;
    specificationLink: string | undefined
}

export async function createVersion({ version, image, changes, download, template_id, specificationLink, path }: Params2) {
    // const pool = await db.connect()
    const { has } = auth();
    const canManage = has({permission:"org:mod:change"});
    if(!canManage) return null
    try {
        // Insert new version into template_versions table
        const { rows: [{ id: versionId }] } = await pool.query(
            `INSERT INTO h3_szablony.template_versions (version, image, changes, download, template_id, specificationLink)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id`,
            [version, image, changes, download, template_id, specificationLink]
        );

        // Update templates table to include the new version ID
        await pool.query(
            `UPDATE h3_szablony.templates
             SET version_ids = array_append(version_ids, $1)
             WHERE id = $2`,
            [versionId, template_id]
        );

        revalidatePath(path);
    } catch (error) {
        throw new Error(`Failed to create version: ${error.message}`);
    }
}

export async function editVersion({ versionId, version, image, changes, download, specificationLink, path }: Params2) {
    // const pool = await db.connect()
    const { has } = auth();
    const canManage = has({permission:"org:mod:change"});
    if(!canManage) return null
    try {
        // Update the version details in the template_versions table
        await pool.query(
            `UPDATE h3_szablony.template_versions
             SET version = $1, image = $2, changes = $3, download = $4, specificationLink = $5
             WHERE id = $6`,
            [version, image, changes, download, specificationLink, versionId]
        );

        revalidatePath(path);
    } catch (error) {
        throw new Error(`Failed to edit version: ${error.message}`);
    }
}

export async function deleteVersion(versionId, template_id) {
    // const pool = await db.connect()
    const { has } = auth();
    const canManage = has({permission:"org:mod:change"});
    if(!canManage) return null
    try {
        // Delete the version from template_versions table
        await pool.query(`DELETE FROM h3_szablony.template_versions WHERE id = $1`, [versionId]);

        // Remove the version ID from the template's version_ids array
        await pool.query(
            `UPDATE h3_szablony.templates
             SET version_ids = array_remove(version_ids, $1)
             WHERE id = $2`,
            [versionId, template_id]
        );
        revalidatePath("/templates")
    } catch (error) {
        throw new Error(`Failed to delete version: ${error.message}`);
    }
}

export async function deleteTemplate(template_id) {
    // const pool = await db.connect()
    const { has } = auth();
    const canManage = has({permission:"org:mod:change"});
    if(!canManage) return null
    try {
        await pool.query(
            `DELETE FROM h3_szablony.template_versions WHERE template_id = $1`,
            [template_id]
        );
        // Delete the template from the templates table
        await pool.query(`DELETE FROM h3_szablony.templates WHERE id = $1`, [template_id]);
        revalidatePath("/templates")
        // Optionally, you can also delete all versions associated with this template
        // await pool.query(`DELETE FROM template_versions WHERE template_id = $1`, [templateId]);
    } catch (error) {
        throw new Error(`Failed to delete template: ${error.message}`);
    }
}
