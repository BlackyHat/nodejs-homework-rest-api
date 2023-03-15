const {
  register,
  login,
  logout,
  updatedSubscription,
} = require("./authService");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavorite,
  countContacts,
} = require("./contactsService");

module.exports = {
  register,
  login,
  logout,
  updatedSubscription,
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavorite,
};
