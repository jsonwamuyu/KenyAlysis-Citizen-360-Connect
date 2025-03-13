const express = require("express");
const authController = require("../controllers/authController");
const { identifyUser } = require("../middlewares/identification");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post(
  "/forgot-password",
  authController.sendForgotPasswordEmail
);
router.patch('/reset-password', authController.resetPassword)

// router.patch("/verify-forgot-password-code", authController.verifyForgotPasswordCode);

// Later implementation
// TODO  -> VERIFY EMAIL

// router.patch("/send-verification-code", identifyUser, authController.sendVerificationCode);
// router.patch("/verify-verification-code", identifyUser, authController.verifyVerificationCode);

// Changed path from `/` to `/change-password`
// router.patch("/change-password", identifyUser, authController.changePassword);

module.exports = router;
