const Contacts = require("../models/contact.model");
const asyncHandler = require("express-async-handler");

const getAllContacts = asyncHandler(async (_, res) => {
  const contacts = await Contacts.find({});
  if (!contacts) {
    res.status(400);
    throw new Error("Failed to get contacts.");
  }
  res.status(200).json({ message: "Success.", qty: contacts.length, contacts });
});

const getContactById = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;
  const contactById = await await Contacts.findById(contactId);
  console.log(contactById);
  if (!contactById) {
    res.status(404);
    throw new Error(`Contact with id=${contactId} not found`);
  }

  res.status(200).json(contactById);
});

const addContact = asyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name) {
    res.status(400);
    throw new Error(`Error. Missing required name field.`);
  } else if (!phone) {
    res.status(400);
    throw new Error(`Error. Missing required phone field.`);
  } else if (!email) {
    res.status(400);
    throw new Error(`Error. Missing required email field.`);
  }
  const newContact = { name, phone, email };

  const contact = new Contacts(newContact);
  await contact.save();
  res
    .status(201)
    .json({ message: "Success. Contact was created.", ...newContact });
});

const removeContact = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;
  const removedContact = await Contacts.findByIdAndRemove(contactId);

  if (!removedContact) {
    res.status(404);
    throw new Error(`Contact with id:${contactId} was not found`);
  }

  res.status(200).json(`Success. Contact deleted.`);
});

const updateContact = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;

  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    res.status(400);
    throw new Error(`Missing fields.`);
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

  res.status(200).json({ message: "Success. Contact data updated.", contact });
});

const toggleFavorite = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
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
  res.status(200).json({ message: "Success. Contact was added to favorite." });
});

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavorite,
};
