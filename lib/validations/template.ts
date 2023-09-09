import * as z from "zod";

export const TemplateValidation = z.object({
  title: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  download: z.string().optional(),
  description: z.string(),
  specification: z.string(),
  creator: z.string().optional(),
  settings: z.string(),
  rules: z.string(),
  image: z.string(),
  trade: z.string(),

});
