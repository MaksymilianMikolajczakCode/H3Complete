import * as z from "zod";

export const VersionValidation = z.object({
  version: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  download: z.string(),
  changes: z.string(),
  creator: z.string().optional(),
  image: z.string(),
});
