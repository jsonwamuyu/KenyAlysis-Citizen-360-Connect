const express = require ("express");
import authController from '../controllers/authController'
const router = express.Router();



router.post("/signup", authController.signup);

router.get("/login", authController.login);

router.get('/logout', identifyUser,authController.logout);

router.patch('/send-verification-code', identifyUser,authController.sendVerificationCode)

router.patch('/verify-verification-code', identifyUser,authController.verifyVerificationCode)


module.exports = router;