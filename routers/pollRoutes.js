// pollRoutes.js
import express from 'express';
import pollController from '../controllers/pollController.js';
import { authenticate, authorizeGovOfficial } from '../middlewares/authMiddleware.js';

const pollRouter = express.Router();

pollRouter.post('/', authenticate, authorizeGovOfficial, pollController.createPoll);
pollRouter.get('/', authenticate, pollController.getAllPolls);
pollRouter.get('/:id', authenticate, pollController.getPollById);
pollRouter.post('/:id/vote', authenticate, pollController.voteOnPoll);

export default pollRouter;