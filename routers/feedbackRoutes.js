// feedbackRoutes.js
import express from 'express';
import feedbackController from '../controllers/feedbackController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/', authenticate, feedbackController.submitFeedback);
feedbackRouter.get('/', authenticate, feedbackController.getAllFeedback);

export default feedbackRouter;