
const asyncHandler = require("express-async-handler");
const { reVerificateProfile } = require("../../services");

const reVerificationController = asyncHandler(async (req, res) => {
  await reVerificateProfile(req.body);
  res.status(200).json({ message: 'Verification email sent' });
});

module.exports = reVerificationController;
