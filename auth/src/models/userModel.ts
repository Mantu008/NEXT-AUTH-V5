import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },

  lastName: {
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

  role: {
    type: String,
    default: "user"
  },

  image: {
    type: String
  },

  authProviderId: {
    type: String
  }

});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
