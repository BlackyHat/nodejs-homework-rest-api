const asyncHandler = require("express-async-handler");
const { toggleFavorite } = require("../../services/contactsService");

const toggleFavoriteController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: userId } = req.user;

  await toggleFavorite(contactId, favorite, userId);

  res.status(200).json({
    message: `Success. Contact was ${
      favorite === "true" ? "added" : "deleted"
    } to favorite.`,
  });
});

module.exports = toggleFavoriteController;
