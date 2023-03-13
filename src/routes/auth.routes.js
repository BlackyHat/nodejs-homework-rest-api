const router = require("express").Router();

const { loginController, registerController } = require("../controllers/users");

// const { validateContact } = require('../validation/contact.validation');

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = { authRouter: router };
