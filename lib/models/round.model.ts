import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roundSchema = new Schema({
    finishDate: {
    type: Date,
  },
  matches: [{
    type: Schema.Types.ObjectId,
    ref: 'Match'
  }],
  roundNumber: {
    type: String
  },
  bestOf: {
    type: Number
  },
  competition: {
    type: Schema.Types.ObjectId,
    ref: "Competition"
  }
});

const Round = mongoose.models.Round || mongoose.model("Round", roundSchema);

export default Round;
