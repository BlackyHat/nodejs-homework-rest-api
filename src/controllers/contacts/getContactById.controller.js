const asyncHandler = require("express-async-handler");
const { getContactById } = require("../../services/contactsService");

const getContactByIdController = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const contactById = await getContactById(userId, contactId);
  res.status(200).json(contactById);
});

module.exports = getContactByIdController;
