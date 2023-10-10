import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
  onboarded: {
    type: Boolean,
    default: false,
  },
  discord: {
    type: String,
    required: false
  },
  competitions: {
    type: Schema.Types.ObjectId,
    ref: 'Competition'
  },
  admin: [{
    type: Schema.Types.ObjectId,
    ref: 'Competition'
  }],
  matches: [{
    type: Schema.Types.ObjectId,
    ref: 'Match'
  }]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;