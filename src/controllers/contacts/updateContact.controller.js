const asyncHandler = require('express-async-handler');
const Contacts = require('../../models/contact.model');

const updateContactController = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    res.status(400);
    throw new Error('Missing fields.');
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

  res.status(200).json({ message: 'Success. Contact data updated.', contact });
});

module.exports = updateContactController;
