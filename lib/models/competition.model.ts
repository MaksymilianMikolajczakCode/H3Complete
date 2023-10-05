import mongoose from "mongoose";

const Schema = mongoose.Schema;


const subSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
    }
})

// const subSchema2 = new Schema({
//     roundNumber: {
//         type: Number,
//         required: true
//     },
//     endDate: {
//         type: Date,
//         required: true
//     }
// })


const competitionSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  regulations: {
    type: String
  },
  regulationsLink: {
    type: String
  },
  details: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  startDate: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['Swiss', 'League', 'Bracket', 'Basket Bracket']
  },
  image: String,
  round: [{
    type: Schema.Types.ObjectId,
    ref: "Round"
  }]
});

const Competition = mongoose.models.Competition || mongoose.model("Competition", competitionSchema);

export default Competition;
