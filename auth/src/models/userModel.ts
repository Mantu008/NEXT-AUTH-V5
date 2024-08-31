import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    select: false, // Prevents the password from being selected by default
  },
  googleId: {
    type: String,
  },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
