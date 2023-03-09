const asyncHandler = require('express-async-handler');
const Contacts = require('../../models/contact.model');

const addContactController = asyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Error. Missing required name field.');
  } else if (!phone) {
    res.status(400);
    throw new Error('Error. Missing required phone field.');
  } else if (!email) {
    res.status(400);
    throw new Error('Error. Missing required email field.');
  }
  const newContact = { name, phone, email };

  const contact = new Contacts(newContact);
  await contact.save();
  res
    .status(201)
    .json({ message: 'Success. Contact was created.', ...newContact });
});

module.exports = addContactController;
