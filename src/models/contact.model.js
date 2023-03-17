const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Set name for contact."],
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Set phone for contact."],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Set email for contact."],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("contact", contactSchema);
