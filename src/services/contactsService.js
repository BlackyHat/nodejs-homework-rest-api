const Contacts = require("../models/contact.model");
const { AppError } = require("../utils");

const getContacts = async (owner, page, limit, favorite) => {
  let query = {
    owner,
  };

  if (typeof favorite === "boolean") {
    query.favorite = toString(favorite);
  }

  const contacts = await Contacts.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  if (!contacts) {
    throw new AppError(400, "Error. Failed to get contacts.");
  }
  const count = await countContacts(query);
  return { count, contacts };
};

const getContactById = async (owner, contactId) => {
  const contactById = await Contacts.findOne({ _id: contactId, owner });
  if (!contactById) {
    throw new AppError(404, `Contact with id=${contactId} not found`);
  }
  return contactById;
};

const addContact = async (newContact, owner) => {
  const { name, phone, email } = newContact;

  if (!name) {
    throw new AppError(400, "Error. Missing required name field.");
  } else if (!phone) {
    throw new AppError(400, "Error. Missing required phone field.");
  } else if (!email) {
    throw new AppError(400, "Error. Missing required email field.");
  }

  const contact = new Contacts({ ...newContact, owner });
  await contact.save();
};

const removeContact = async (contactId, owner) => {
  const removedContact = await Contacts.findOneAndRemove({
    _id: contactId,
    owner,
  });
  if (!removedContact) {
    throw new AppError(404, `Contact with id:${contactId} was not found`);
  }
  return removedContact;
};

const updateContact = async (contactId, updatedContact, owner) => {
  const { name, email, phone } = updatedContact;

  if (!name && !email && !phone) {
    throw new AppError(400, "Error. Missing fields.");
  }

  const contact = await Contacts.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: updatedContact },
    { new: true }
  );
  if (!contact) {
    throw new AppError(404, `Contact with id=${contactId} not found`);
  }

  return contact;
};

const toggleFavorite = async (contactId, favorite, owner) => {
  if (!favorite) {
    throw new AppError(400, "Error. Missing field favorite.");
  }

  const updatedContact = await Contacts.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite } },
    { new: true }
  );

  if (!updatedContact) {
    throw new AppError(404, `Contact with id:${contactId} was not found`);
  }
};

const countContacts = async (props) => {
  return await Contacts.count({ ...props });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavorite,
  countContacts,
};
