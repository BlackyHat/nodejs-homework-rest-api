const { register, login, logout, updatedProfile } = require("./authService");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavorite,
  countContacts,
} = require("./contactsService");

const { uploadAvatar } = require("./avatarService");

module.exports = {
  register,
  login,
  logout,
  updatedProfile,
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavorite,
  uploadAvatar,
};
