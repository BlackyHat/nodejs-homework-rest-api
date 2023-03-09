const getAllContactsController = require('./getAllContacts.controller');
const getContactByIdController = require('./getContactById.controller');
const addContactController = require('./addContact.controller');
const removeContactController = require('./removeContact.controller');
const updateContactController = require('./updateContact.controller');
const toggleFavoriteController = require('./toggleFavorite.controller');

module.exports = {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  toggleFavoriteController,
};
