const asyncHandler = require("express-async-handler");
const { login } = require("../../services");

const loginController = asyncHandler(async (req, res) => {
  const { token, email, subscription } = await login(req.body);
  res
    .status(200)
    .json({ message: "Success.", token, user: { email, subscription } });
});

module.exports = loginController;
