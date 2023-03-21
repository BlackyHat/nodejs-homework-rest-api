const { register, login, logout, updatedProfile, verificateProfile, reVerificateProfile } = require("./authService");
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
  verificateProfile,
  reVerificateProfile
};
