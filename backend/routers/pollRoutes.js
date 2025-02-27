const express = require('express');
const pollController = require('../controllers/pollsController.js'); // Ensure correct path
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, pollController.createPoll);
router.get('/', authenticate, pollController.getAllPolls);
router.get('/:id', authenticate, pollController.getPollById);
router.post('/:id/vote', authenticate, pollController.voteOnPoll);

module.exports = router;
