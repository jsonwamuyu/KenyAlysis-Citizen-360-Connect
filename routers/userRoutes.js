// userRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

userRouter.get('/', authenticate, authorizeAdmin, userController.getAllUsers);
userRouter.get('/:id', authenticate, userController.getUserById);
userRouter.patch('/:id/role', authenticate, authorizeAdmin, userController.updateUserRole);
userRouter.delete('/:id', authenticate, authorizeAdmin, userController.deleteUser);

module.exports = router;