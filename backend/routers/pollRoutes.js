const express = require('express');
const pollController = require('../controllers/pollsController.js'); // Ensure correct path
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Create a new poll (Admin Only)
router.post('/create-poll',authenticate,authorizeAdmin, pollController.createPoll);

// Get all active polls
router.get('/get-all-polls', authenticate, pollController.getAllPolls);

// Get a specific poll by ID
router.get('/:id', authenticate,pollController.getPollById);

// Vote on a poll
router.post('/:id/vote', authenticate, pollController.voteOnPoll);
router.get('/:id/has-voted', authenticate, pollController.hasUserVoted);

// Get poll results (vote count)
router.get('/:id/results', authenticate,pollController.getPollResults);

// Delete a poll (Admin Only)
router.delete('/:id', authenticate, authorizeAdmin, pollController.deletePoll);

module.exports = router;
