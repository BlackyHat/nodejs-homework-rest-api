const router = require("express").Router();
const {authMiddleware, upload} = require("../middlewares");

const {
  loginController,
  registerController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
  updateAvatarController,
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

router.patch("/avatars", authMiddleware, upload, updateAvatarController);

module.exports = { authRouter: router };
