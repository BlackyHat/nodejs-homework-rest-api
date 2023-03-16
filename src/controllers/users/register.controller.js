const asyncHandler = require("express-async-handler");
const { register } = require("../../services");

const registerController = asyncHandler(async (req, res) => {
  const { email, subscription } = await register(req.body);
  res.status(201).json({
    message: "Success. New user was created.",
    user: { email, subscription },
  });
});

module.exports = registerController;
