const Contacts = require("../models/contact.model");
const { AppError } = require("../utils");

const getContacts = async (userId) => {
  const contacts = await Contacts.find({ userId });
  if (!contacts) {
    throw new AppError(400, "Error. Failed to get contacts.");
  }
  return contacts;
};

const getContactById = async (userId, contactId) => {
  const contactById = await Contacts.findOne({ _id: contactId, userId });
  if (!contactById) {
    throw new AppError(404, `Contact with id=${contactId} not found`);
  }
  return contactById;
};

const addContact = async (newContact, userId) => {
  const { name, phone, email } = newContact;

  if (!name) {
    throw new AppError(400, "Error. Missing required name field.");
  } else if (!phone) {
    throw new AppError(400, "Error. Missing required phone field.");
  } else if (!email) {
    throw new AppError(400, "Error. Missing required email field.");
  }

  const contact = new Contacts({ ...newContact, userId });
  await contact.save();
};

const removeContact = async (contactId, userId) => {
  const removedContact = await Contacts.findOneAndRemove({
    _id: contactId,
    userId,
  });
  if (!removedContact) {
    throw new AppError(404, `Contact with id:${contactId} was not found`);
  }
  return removedContact;
};

const updateContact = async (contactId, updatedContact, userId) => {
  const { name, email, phone } = updatedContact;

  if (!name && !email && !phone) {
    throw new AppError(400, "Error. Missing fields.");
  }

  const contact = await Contacts.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: updatedContact },
    { new: true }
  );
  if (!contact) {
    throw new AppError(404, `Contact with id=${contactId} not found`);
  }

  return contact;
};

const toggleFavorite = async (contactId, favorite, userId) => {
  if (!favorite) {
    throw new AppError(400, "Error. Missing field favorite.");
  }

  const updatedContact = await Contacts.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: { favorite } },
    { new: true }
  );

  if (!updatedContact) {
    throw new AppError(404, `Contact with id:${contactId} was not found`);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavorite,
};
