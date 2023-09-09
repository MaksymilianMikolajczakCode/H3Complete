import mongoose from "mongoose";
import { number } from "zod";

const Schema = mongoose.Schema;

const matchSchema = new mongoose.Schema({
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      winner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      matchNumber: {
        type: Number
      }
});

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default Match;