import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name for the contact"],
    },
    email: {
      type: String,
      required: [true, "Please add the email for the contact"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number for the contact"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model("Contact", contactSchema);
