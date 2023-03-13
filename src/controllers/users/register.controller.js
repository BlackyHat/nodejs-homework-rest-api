const asyncHandler = require("express-async-handler");
const { register } = require("../../services/authService");
const { AppError } = require("../../utils");

const registerController = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  await register(password, email);
  // if (!name && !email && !phone) {
  //   throw new AppError(400, "Error. Missing fields.");
  // }

  res.status(200).json({ message: "Success." });
});

module.exports = registerController;
