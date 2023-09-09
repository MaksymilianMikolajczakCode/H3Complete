import mongoose from "mongoose";

const Schema = mongoose.Schema;


const subSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    trade: {
        type: Number,
        required: true,
    },
    castle: {
        type: String,
        enum: ['Necropolis', 'Rampart', 'Castle', 'Dungeon', 'Cove', 'Inferno', 'Conflux', 'Stronghold', 'Fortress', 'Tower', ]
    },
})


const reportSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  sides: [subSchema]

});

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
