const asyncHandler = require("express-async-handler");
const Contacts = require("../../models/contact.model");
const { AppError } = require("../../utils");

const getContactByIdController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contacts.findById(contactId);
  if (!contactById) {
    throw new AppError(404, `Contact with id=${contactId} not found`);
  }

  res.status(200).json(contactById);
});

module.exports = getContactByIdController;
