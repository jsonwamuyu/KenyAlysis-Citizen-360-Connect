import express from ("express");
import authController from '../controllers/authController'
const router = express.Router();



router.post("/signup", authController.signup);

router.get("/login", authController.login);




module.exports = router;