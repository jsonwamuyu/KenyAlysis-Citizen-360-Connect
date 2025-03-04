const express = require('express');
const userController = require('../controllers/userController.js'); 
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/get-all-users', authenticate, authorizeAdmin, authorizeAdmin, userController.getAllUsers);
// router.get('/get-all-users', userController.getAllUsers);

router.get('/:id', authenticate, authorizeAdmin,userController.getUserById);
// router.get('/:id', userController.getUserById);
router.patch('/:id/role', authenticate, authorizeAdmin, userController.updateUserRole);
router.delete('/:id', authenticate, authorizeAdmin, userController.deleteUser);


// Get logged-in user details
// router.get('/profile', authenticate, userController.getProfile)

module.exports = router;
