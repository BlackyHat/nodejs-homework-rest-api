const asyncHandler = require("express-async-handler");
const { login } = require("../../services/authService");
const { AppError } = require("../../utils");

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const token = await login(email, password);
  res.status(200).json({ message: "Success.", token });
});

module.exports = loginController;
