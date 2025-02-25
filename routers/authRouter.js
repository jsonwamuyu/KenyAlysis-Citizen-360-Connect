const express = require("express");
import authController from "../controllers/authController";
import { identifyUser } from "../middlewares/identification";
const router = express.Router();

router.post("/signup", authController.signup);

router.get("/login", authController.login);

router.get("/logout", identifyUser, authController.logout);

router.patch(
  "/send-verification-code",
  identifyUser,
  authController.sendVerificationCode
);

router.patch(
  "/verify-verification-code",
  identifyUser,
  authController.verifyVerificationCode
);
router.patch("/", identifyUser, authController.changePassword);

module.exports = router;
