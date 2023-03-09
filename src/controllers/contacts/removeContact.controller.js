const Contacts = require("../../models/contact.model");
const asyncHandler = require("express-async-handler");

const removeContactController = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;
  const removedContact = await Contacts.findByIdAndRemove(contactId);

  if (!removedContact) {
    res.status(404);
    throw new Error(`Contact with id:${contactId} was not found`);
  }

  res.status(200).json(`Success. Contact deleted.`);
});

module.exports = removeContactController;
