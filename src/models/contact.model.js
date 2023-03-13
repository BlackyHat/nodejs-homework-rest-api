const { Schema, SchemaTypes, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Set name for contact."],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Set phone for contact."],
    },
    userId: String,
    email: {
      type: String,
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
contactSchema.owner = { type: SchemaTypes.ObjectId, ref: "users" };

module.exports = model("contact", contactSchema);
