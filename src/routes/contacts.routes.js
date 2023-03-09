const router = require("express").Router();

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavorite,
} = require("../controllers/contacts.controller");
const { validateContact } = require("../validation/contact.validation");

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateContact, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateContact, updateContact);

router.patch("/:contactId/favorite", toggleFavorite);

module.exports = router;
