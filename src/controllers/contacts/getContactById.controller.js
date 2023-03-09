const Contacts = require("../../models/contact.model");
const asyncHandler = require("express-async-handler");

const getContactByIdController = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;
  const contactById = await await Contacts.findById(contactId);
  if (!contactById) {
    res.status(404);
    throw new Error(`Contact with id=${contactId} not found`);
  }

  res.status(200).json(contactById);
});

module.exports = getContactByIdController;
