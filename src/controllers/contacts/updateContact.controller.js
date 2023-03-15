const asyncHandler = require("express-async-handler");
const { updateContact } = require("../../services");

const updateContactController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const { body: updatedContact } = req;

  const contact = await updateContact(contactId, updatedContact, owner);
  res.status(200).json({ message: "Success. Contact data updated.", contact });
});

module.exports = updateContactController;
