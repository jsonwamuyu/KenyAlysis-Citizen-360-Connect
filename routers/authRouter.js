const express = require("express");
const authController = require("../controllers/authController");
const { identifyUser } = require("../middlewares/identification");

const router = express.Router();

router.post("/signup", authController.signup);

// Changed login method from GET to POST
router.post("/login", authController.login);

// Logout might not need identifyUser middleware
router.post("/logout", authController.logout);

router.patch("/send-verification-code", identifyUser, authController.sendVerificationCode);
router.patch("/verify-verification-code", identifyUser, authController.verifyVerificationCode);

// Changed path from `/` to `/change-password`
router.patch("/change-password", identifyUser, authController.changePassword);

router.post("/send-forgot-password-code", authController.sendForgotPasswordCode);
router.patch("/verify-forgot-password-code", authController.verifyForgotPasswordCode);

module.exports = router;
