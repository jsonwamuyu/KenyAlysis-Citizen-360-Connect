// feedbackRoutes.js
const express =  require('express');
const feedbackController = require('../controllers/feedbackController.js');
const { authenticate } = require('../middlewares/authMiddleware.js');

const feedbackRouter = express.Router();

feedbackRouter.post('/', authenticate, feedbackController.submitFeedback);
feedbackRouter.get('/', authenticate, feedbackController.getAllFeedback);

module.exports = feedbackRouter;