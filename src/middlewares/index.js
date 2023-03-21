const authMiddleware = require("./authMiddleware");
const badUrlError = require("./badUrlError");
const errorHandler = require("./errorHandler");
const upload = require("./uploadMiddleware");

module.exports = {
  authMiddleware,
  badUrlError,
  errorHandler,
  upload,
};
