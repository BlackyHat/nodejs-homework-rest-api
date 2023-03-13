const asyncHandler = require("express-async-handler");
const { addContact } = require("../../services/contactsService");

const addContactController = asyncHandler(async (req, res) => {
  const { body: newContact } = req;
  const { _id: userId } = req.user;

  await addContact(newContact, userId);
  res
    .status(201)
    .json({ message: "Success. Contact was created.", ...newContact });
});

module.exports = addContactController;
