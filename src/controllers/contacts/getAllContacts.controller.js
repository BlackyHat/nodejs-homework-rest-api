const asyncHandler = require("express-async-handler");
const { getContacts } = require("../../services/contactsService");

const getAllContactsController = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const contacts = await getContacts(userId);
  res.status(200).json({ message: "Success.", qty: contacts.length, contacts });
});

module.exports = getAllContactsController;
