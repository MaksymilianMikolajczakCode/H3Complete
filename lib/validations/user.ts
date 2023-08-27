import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
   discord: z 
    .string().url().optional(),
    // role: z.enum(['admin', 'player'], {
    //     errorMap: (issue, ctx) => {
    //       return { message: 'Invalid role' };
    //     },
    //   }),
});