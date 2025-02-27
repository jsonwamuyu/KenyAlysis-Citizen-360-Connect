const express = require('express');
const userController = require('../controllers/userController.js'); 
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.patch('/:id/role', authenticate, authorizeAdmin, userController.updateUserRole);
router.delete('/:id', authenticate, authorizeAdmin, userController.deleteUser);

module.exports = router;
