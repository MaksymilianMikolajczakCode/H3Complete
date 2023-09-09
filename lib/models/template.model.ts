import mongoose from "mongoose";

const Schema = mongoose.Schema;

const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
  specification: {
    type: String
  },
  description: {
    type: String
  },
  rules: {
    type: String,
  },
  settings: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  trade: {
    type: String
  },
  download: {
    type: String
  }
});

const Template = mongoose.models.Template || mongoose.model("Template", templateSchema);

export default Template;