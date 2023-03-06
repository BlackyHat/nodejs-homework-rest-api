const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "../../db/contacts.json");

async function getContactList() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contacts = await getContactList();

  const contactById = contacts.find(
    (contact) => String(contact.id) === contactId
  );

  if (!contactById) {
    const error = new Error(`Not found.`);
    error.statusCode = 404;
    throw error;
  }

  return contactById;
}

async function removeContact(contactId) {
  const contacts = await getContactList();
  const index = contacts.findIndex(
    (contact) => String(contact.id) === contactId
  );

  if (index === -1) {
    const error = new Error(`Not found.`);
    error.statusCode = 404;
    throw error;
  }

  contacts.splice(index, 1);
  writeContacts(contacts);
}

async function addContact(newContact) {
  const contacts = await getContactList();
  contacts.push(newContact);
  writeContacts(contacts);
  return newContact;
}

async function updateContact(id, newContactData) {
  const contacts = await getContactList();
  const index = contacts.findIndex((contact) => String(contact.id) === id);

  if (index === -1) {
    const error = new Error(`Not found.`);
    error.statusCode = 404;
    throw error;
  }

  const updatedContact = { ...contacts[index], ...newContactData };
  contacts.splice(index, 1, updatedContact);

  writeContacts(contacts);
  return updatedContact;
}

async function writeContacts(contacts) {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
    if (error) {
      throw error;
    }
    console.log("Contact has been removed.");
  });
}

module.exports = {
  getContactList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
