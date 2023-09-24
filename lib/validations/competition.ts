import * as z from "zod";

export const CompetitionValidation = z.object({
  title: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  // type: z.enum(['Swiss', 'League', 'Bracket', 'Basket Bracket']),
  details: z.string(),
  regulations: z.string(),
  regulationsLink: z.string(),
  startDate: z.date(),
  image: z.string(),
});
