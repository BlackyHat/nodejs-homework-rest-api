const Contacts = require("../../models/contact.model");
const asyncHandler = require("express-async-handler");

const getAllContactsController = asyncHandler(async (_, res) => {
  const contacts = await Contacts.find({});
  if (!contacts) {
    res.status(400);
    throw new Error("Failed to get contacts.");
  }
  res.status(200).json({ message: "Success.", qty: contacts.length, contacts });
});

module.exports = getAllContactsController;
