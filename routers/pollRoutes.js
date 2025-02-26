// pollRoutes.js
const express = require('express');
const pollController = require('../controllers/pollController.js');
const { authenticate, authorizeGovOfficial } = require('../middlewares/authMiddleware.js');

const pollRouter = express.Router();

pollRouter.post('/', authenticate, authorizeGovOfficial, pollController.createPoll);
pollRouter.get('/', authenticate, pollController.getAllPolls);
pollRouter.get('/:id', authenticate, pollController.getPollById);
pollRouter.post('/:id/vote', authenticate, pollController.voteOnPoll);

module.exports =  pollRouter;