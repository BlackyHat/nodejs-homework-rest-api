const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  loginController,
  registerController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
} = require("../controllers/users");
const {
  validateAuth,
  validateSubscription,
} = require("../validation/auth.validation");

router.post("/register", validateAuth, registerController);
router.post("/login", validateAuth, loginController);
router.post("/logout", authMiddleware, logoutController);
router.post("/current", authMiddleware, currentUserController);
router.patch(
  "/",
  authMiddleware,
  validateSubscription,
  updateSubscriptionController
);

module.exports = { authRouter: router };
