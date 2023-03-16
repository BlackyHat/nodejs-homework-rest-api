const asyncHandler = require("express-async-handler");

const currentUserController = asyncHandler(async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ message: "Success.", user: { email, subscription } });
});

module.exports = currentUserController;
