import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide the username"],
    },
    email: {
      type: String,
      required: [true, "Please provide with the user email"],
      unique: [true, "Email already taken"],
    },
    password: {
      type: String,
      required: [true, "Please provide with a user password"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
