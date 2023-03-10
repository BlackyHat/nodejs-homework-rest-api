const asyncHandler = require("express-async-handler");
const Contacts = require("../../models/contact.model");
const { AppError } = require("../../utils");

const toggleFavoriteController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    throw new AppError(400, "Error. Missing field favorite.");
  }

  const contact = await Contacts.findByIdAndUpdate(
    contactId,
    { $set: { ...req.body } },
    { new: true }
  );

  if (!contact) {
    throw new AppError(404, `Contact with id:${contactId} was not found`);
  }
  res.status(200).json({
    message: `Success. Contact was ${
      favorite ? "added" : "deleted"
    } to favorite.`,
  });
});

module.exports = toggleFavoriteController;
