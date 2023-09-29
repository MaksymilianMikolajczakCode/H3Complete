import * as z from "zod";

export const MatchValidation = z.object({
  winnerCastle: z.enum(['Necropolis', 'Rampart', 'Castle', 'Dungeon', 'Cove', 'Inferno', 'Conflux', 'Stronghold', 'Fortress', 'Tower', ]),
  loserCastle: z.enum(['Necropolis', 'Rampart', 'Castle', 'Dungeon', 'Cove', 'Inferno', 'Conflux', 'Stronghold', 'Fortress', 'Tower', ]),
  winner: z.string(),
  loser: z.string(),
  winnerTrade: z.string().transform((v) => Number(v)||0),
  loserTrade: z.string().transform((v) => Number(v)||0),
  matchNumber: z.number(),
  competition: z.string(),
  NoR1Games: z.number(),
  matchId: z.string(),
  description: z.string(),
});
