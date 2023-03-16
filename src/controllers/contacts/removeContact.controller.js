const asyncHandler = require("express-async-handler");
const { removeContact } = require("../../services");

const removeContactController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  await removeContact(contactId, owner);
  res.status(200).json("Success. Contact deleted.");
});

module.exports = removeContactController;
