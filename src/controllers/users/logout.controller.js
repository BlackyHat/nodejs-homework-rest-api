const asyncHandler = require("express-async-handler");
const { logout } = require("../../services");

const logoutController = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  await logout(userId);
  res.status(204).json({ message: "Logout success." });
});

module.exports = logoutController;
