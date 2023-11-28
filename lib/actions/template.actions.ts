"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import Template from "../models/template.model";


interface Params {
    title: string,
    image: string,
    description: string,
    rules: String,
    settings: String,
    specification: string,
    // creator: String | undefined,
    trade: string,
    download: string | undefined,
    path: string
  }

export async function createTemplate({ title, image, description, settings, download, trade, rules, specification,  path}: Params
    ) {
      try {
        connectToDB();
        const createdTemplate = await Template.create({
            title,
            image,
            description,
            rules,
            settings,
            specification,
            // creator,
            trade,
            download,
            path,        });

        revalidatePath(path);
      } catch (error: any) {
        throw new Error(`Failed to create template: ${error.message}`);
      }
    }



    export async function fetchTemplates() {
      connectToDB();

      const templates = await Template.find()

      return { templates };
    }

    export async function fetchTemplateById(templateId: string) {
      connectToDB();
    
      try {
        const templateQuery = Template.findById(templateId).lean()

        const template = await templateQuery.exec()
        return template;
      } catch (err) {
        console.error("Error while fetching template:", err);
        throw new Error("Unable to fetch template");
      }
    }


interface Params2 {
    version: string,
    image: string,
    changes: string,
    // creator: String | undefined,
    download: string,
    path: string,
    templateId: string
  }

    export async function createVersion({ version, image, changes, download, templateId, path}: Params2
      ) {
        try {
          connectToDB();
              await Template.findByIdAndUpdate(templateId, {
                $push: { version: {version: version, image:image, changes:changes, download:download} },
              });
          revalidatePath(path);
        } catch (error: any) {
          throw new Error(`Failed to create template: ${error.message}`);
        }
      }
  