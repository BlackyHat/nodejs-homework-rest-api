const asyncHandler = require("express-async-handler");
const { verificateProfile } = require("../../services");

const verificationTokenController = asyncHandler(async (req, res) => {
  const {verificationToken} = req.params;

  await verificateProfile(verificationToken);
  res.status(200).json({ message: 'Verification successful' });
});

module.exports = verificationTokenController;
