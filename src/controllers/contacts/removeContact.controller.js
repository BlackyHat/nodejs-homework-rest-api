const asyncHandler = require("express-async-handler");
const { removeContact } = require("../../services/contactsService");

const removeContactController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  await removeContact(contactId, userId);
  res.status(200).json("Success. Contact deleted.");
});

module.exports = removeContactController;
