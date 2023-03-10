const asyncHandler = require("express-async-handler");
const Contacts = require("../../models/contact.model");
const { AppError } = require("../../utils");

const getAllContactsController = asyncHandler(async (_, res) => {
  const contacts = await Contacts.find({});
  if (!contacts) {
        throw new AppError(400, "Error. Failed to get contacts.");
  }
  res.status(200).json({ message: "Success.", qty: contacts.length, contacts });
});

module.exports = getAllContactsController;
