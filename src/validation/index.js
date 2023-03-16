const {validateContact} = require("./contact.validation");
const {validateAuth,validateSubscription} = require("./auth.validation");

module.exports = {
  validateAuth,validateSubscription,
  validateContact,
};
