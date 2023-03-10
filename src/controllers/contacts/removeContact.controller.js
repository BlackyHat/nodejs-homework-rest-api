const asyncHandler = require("express-async-handler");
const Contacts = require("../../models/contact.model");
const { AppError } = require("../../utils");

const removeContactController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contacts.findByIdAndRemove(contactId);

  if (!removedContact) {
        throw new AppError(404, `Contact with id:${contactId} was not found`);
  }

  res.status(200).json("Success. Contact deleted.");
});

module.exports = removeContactController;
