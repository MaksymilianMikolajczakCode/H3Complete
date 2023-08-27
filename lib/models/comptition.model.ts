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
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  users: [{
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
  phase: [subSchema],
//   rounds: [subSchema2]
});

const Competition = mongoose.models.Competition || mongoose.model("Competition", competitionSchema);

export default Competition;
