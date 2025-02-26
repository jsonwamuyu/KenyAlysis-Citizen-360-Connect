// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController.js');
const { authenticate, authorizeAdmin } =  require('../middlewares/authMiddleware.js');

const router = express.Router();

userRouter.get('/', authenticate, authorizeAdmin, userController.getAllUsers);
userRouter.get('/:id', authenticate, userController.getUserById);
userRouter.patch('/:id/role', authenticate, authorizeAdmin, userController.updateUserRole);
userRouter.delete('/:id', authenticate, authorizeAdmin, userController.deleteUser);

module.exports = router;