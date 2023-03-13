const asyncHandler = require("express-async-handler");
const { updateContact } = require("../../services/contactsService");

const updateContactController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const { body: updatedContact } = req;

  const contact = await updateContact(contactId, updatedContact, userId);
  res.status(200).json({ message: "Success. Contact data updated.", contact });
});

module.exports = updateContactController;
