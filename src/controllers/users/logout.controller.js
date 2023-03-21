const asyncHandler = require("express-async-handler");
const { logout } = require("../../services");

const logoutController = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  await logout(userId);
  res.sendStatus(204);
});

module.exports = logoutController;
