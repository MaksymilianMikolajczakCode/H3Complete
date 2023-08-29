import { url } from "inspector";
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
//   role: {
//     type: String,
//     enum: ['admin', 'player'],
//     default: 'admin'
//   },
  discord: {
    type: String,
    required: false
  },
  competitions: {
    type: Schema.Types.ObjectId,
    ref: 'Competition'
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;