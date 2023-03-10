const asyncHandler = require("express-async-handler");
const Contacts = require("../../models/contact.model");
const { AppError } = require("../../utils");

const addContactController = asyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name) {
    throw new AppError(400, "Error. Missing required name field.");
  } else if (!phone) {
    throw new AppError(400, "Error. Missing required phone field.");
  } else if (!email) {
    throw new AppError(400, "Error. Missing required email field.");
  }
  const newContact = { name, phone, email };

  const contact = new Contacts(newContact);
  await contact.save();
  res
    .status(201)
    .json({ message: "Success. Contact was created.", ...newContact });
});

module.exports = addContactController;
