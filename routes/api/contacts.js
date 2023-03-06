const express = require("express");
const { randomUUID } = require("crypto");
const {
  contactsValidation,
  updateContactValidation,
} = require("../../validation/contact.validation");

const router = express.Router();
const {
  getContactList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./utils");

const asyncHandler = (routeHandler) => {
  return async (req, res, next) => {
    try {
      await routeHandler(req, res, next);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };
};
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const contacts = await getContactList();
    res.status(200).json(contacts);
  })
);

router.get(
  "/:contactId",
  asyncHandler(async (req, res, next) => {
    const id = req.params.contactId;
    const contactById = await getContactById(id);

    res.status(200).json(contactById);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { error } = contactsValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, phone, email } = req.body;

    if (!name) {
      return res.status(400).json(`Error. Missing required name field.`);
    } else if (!phone) {
      return res.status(400).json(`Error. Missing required phone field.`);
    } else if (!email) {
      return res.status(400).json(`Error. Missing required email field.`);
    }

    const newContact = { id: randomUUID(), name, phone, email };
    addContact(newContact);

    res
      .status(201)
      .json({ message: "Success. Contact was created.", ...newContact });
  })
);

router.delete(
  "/:contactId",
  asyncHandler(async (req, res, next) => {
    await removeContact(req.params.contactId);
    res.status(200).json(`Success. Contact deleted.`);
  })
);

router.put(
  "/:contactId",
  asyncHandler(async (req, res, next) => {
    const { error } = updateContactValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const contact = await updateContact(req.params.contactId, req.body);

    res
      .status(200)
      .json({ message: "Success. Contact data updated.", ...contact });
  })
);

module.exports = router;
