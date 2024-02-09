"use server";

import { revalidatePath } from "next/cache";
import { pool } from '../db'; // Import the existing connection pool

interface Params {
    title: string;
    image: string;
    description: string;
    rules: string;
    settings: string;
    specification: string;
    trade: string;
    download: string | undefined;
    path: string;
}

export async function createTemplate({ title, image, description, settings, download, trade, rules, specification, path }: Params) {
    try {
        await pool.query(
            `INSERT INTO templates (title, image, description, settings, download, trade, rules, specification)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [title, image, description, settings, download, trade, rules, specification]
        );
        revalidatePath(path);
    } catch (error) {
        throw new Error(`Failed to create template: ${error.message}`);
    }
}

export async function fetchTemplates() {
    try {
        const result = await pool.query(`SELECT * FROM templates`);
        return result.rows
    } catch (error) {
        throw new Error(`Failed to fetch templates: ${error.message}`);
    }
}

export async function fetchTemplateById(template_id) {
    try {
        const templateQuery = `SELECT * FROM templates WHERE id = $1`;
        const templateResult = await pool.query(templateQuery, [template_id]);
        const template = templateResult.rows[0];

        if (!template) {
            throw new Error(`Template with ID ${template_id} not found`);
        }

        const templateVersionsQuery = `SELECT * FROM template_versions WHERE template_id = $1`;
        const templateVersionsResult = await pool.query(templateVersionsQuery, [template_id]);
        const templateVersions = templateVersionsResult.rows;

        return {template, templateVersions}
    } catch (error) {
        throw new Error(`Failed to fetch template: ${error.message}`);
    }
}


interface Params2 {
    version: string;
    image: string;
    changes: string;
    download: string;
    path: string;
    template_id: string;
}

export async function createVersion({ version, image, changes, download, template_id, path }: Params2) {
    try {
        // Insert new version into template_versions table
        const { rows: [{ id: versionId }] } = await pool.query(
            `INSERT INTO template_versions (version, image, changes, download, template_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
            [version, image, changes, download, template_id]
        );

        // Update templates table to include the new version ID
        await pool.query(
            `UPDATE templates
             SET version_ids = array_append(version_ids, $1)
             WHERE id = $2`,
            [versionId, template_id]
        );

        revalidatePath(path);
    } catch (error) {
        throw new Error(`Failed to create version: ${error.message}`);
    }
}

