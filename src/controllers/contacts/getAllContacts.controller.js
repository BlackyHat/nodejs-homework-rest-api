const asyncHandler = require("express-async-handler");
const { getContacts } = require("../../services");

const getAllContactsController = asyncHandler(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const { contacts, count } = await getContacts(owner, page, limit, favorite);
  res.status(200).json({
    message: "Success.",
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    contacts,
  });
});

module.exports = getAllContactsController;
