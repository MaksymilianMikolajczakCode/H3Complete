import mongoose from "mongoose";
import { number } from "zod";

const Schema = mongoose.Schema;

const subSchema = new Schema({
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
winnerTrade: {
    type: Number,
},
winnerCastle: {
    type: String,
    enum: ['Necropolis', 'Rampart', 'Castle', 'Dungeon', 'Cove', 'Inferno', 'Conflux', 'Stronghold', 'Fortress', 'Tower', ]
},
loser: {
  type: Schema.Types.ObjectId,
    ref: 'User'
},
loserCastle: {
  type: String,
    enum: ['Necropolis', 'Rampart', 'Castle', 'Dungeon', 'Cove', 'Inferno', 'Conflux', 'Stronghold', 'Fortress', 'Tower', ]
},
loserTrade: {
  type: Number
},
description: {
  type: String
}
})

const matchSchema = new mongoose.Schema({
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      games: [subSchema],
      winner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      matchNumber: {
        type: Number
      },
      roundNumber: {
        type: Number
      },
      competition: {
        type: Schema.Types.ObjectId,
        ref: 'Competition'
      },
      NoR1Games: {
        type: Number
      },
});

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default Match;