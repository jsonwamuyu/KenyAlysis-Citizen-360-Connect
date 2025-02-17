const express = require("express");
const authController = require('../controllers/authController')
const router = express.router();



router.post("/signup", authController.signup);

router.get("/login", authController.login);




modules.exports = router