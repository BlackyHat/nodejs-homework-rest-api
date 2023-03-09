const router = require('express').Router();

const {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  toggleFavoriteController,
} = require('../controllers/contacts');

const { validateContact } = require('../validation/contact.validation');

router.get('/', getAllContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', validateContact, addContactController);

router.delete('/:contactId', removeContactController);

router.put('/:contactId', validateContact, updateContactController);

router.patch('/:contactId/favorite', toggleFavoriteController);

module.exports = router;
