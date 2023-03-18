const asyncHandler = require("express-async-handler");
const { uploadAvatar, updatedProfile } = require("../../services");
const { NotAuthorizedError } = require("../../utils");

const updateAvatarController = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new NotAuthorizedError("Not authorized.");
  }

  const { file, user } = req;

  const newFilename = await uploadAvatar(file, user);
  const avatarURL = `http://localhost:8080/api/avatars/${newFilename}`;
  updatedProfile(user._id, avatarURL);

  res.status(200).json({ message: "Success.", avatarURL });
});

module.exports = updateAvatarController;
