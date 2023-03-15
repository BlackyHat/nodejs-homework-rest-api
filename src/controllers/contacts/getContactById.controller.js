const asyncHandler = require("express-async-handler");
const { getContactById } = require("../../services");

const getContactByIdController = asyncHandler(async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contactById = await getContactById(owner, contactId);
  res.status(200).json(contactById);
});

module.exports = getContactByIdController;
