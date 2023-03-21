const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const PUBLIC_DIR_AVATAR = path.join(
  __dirname,
  "../",
  "../",
  "public",
  "avatars"
);

const uploadAvatar = async (file, user) => {
  const { path: tempImagePath, filename } = file;
  const { _id } = user;
  const [_, extension] = filename.split(".");

  const newFilename = `${_id}.${extension}`;
  await resizeImage(tempImagePath);
  try {
    await fs.rename(tempImagePath, path.join(PUBLIC_DIR_AVATAR, newFilename));
  } catch (err) {
    await fs.unlink(tempImagePath);
    return err;
  }
  return newFilename;
};

const resizeImage = async (imagePath) => {
  const image = await Jimp.read(imagePath);
  image
    .autocrop()
    .contain(
      250,
      250,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
    )
    .writeAsync(imagePath);
};

module.exports = { uploadAvatar };
