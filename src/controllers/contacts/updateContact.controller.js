const asyncHandler = require("express-async-handler");
const Contacts = require("../../models/contact.model");
const { AppError } = require("../../utils");

const updateContactController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    throw new AppError(400, "Error. Missing fields.");
  }

  const contact = await Contacts.findByIdAndUpdate(
    contactId,
    { $set: { ...req.body } },
    { new: true }
  );
  if (!contact) {
    throw new AppError(404, `Contact with id=${contactId} not found`);
  }

  res.status(200).json({ message: "Success. Contact data updated.", contact });
});

module.exports = updateContactController;
