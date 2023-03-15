const asyncHandler = require("express-async-handler");
const { addContact } = require("../../services");

const addContactController = asyncHandler(async (req, res) => {
  const { body: newContact } = req;
  const { _id: owner } = req.user;

  await addContact(newContact, owner);
  res
    .status(201)
    .json({ message: "Success. Contact was created.", ...newContact });
});

module.exports = addContactController;
