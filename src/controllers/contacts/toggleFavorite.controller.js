const Contacts = require("../../models/contact.model");
const asyncHandler = require("express-async-handler");

const toggleFavoriteController = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  if (!favorite) {
    res.status(400);
    throw new Error(`Missing field favorite.`);
  }

  const contact = await Contacts.findByIdAndUpdate(
    contactId,
    { $set: { ...req.body } },
    { new: true }
  );

  if (!contact) {
    res.status(404);
    throw new Error(`Contact with id:${contactId} was not found`);
  }
  res
    .status(200)
    .json({
      message: `Success. Contact was ${
        favorite ? "added" : "deleted"
      } to favorite.`,
    });
});

module.exports = toggleFavoriteController;
