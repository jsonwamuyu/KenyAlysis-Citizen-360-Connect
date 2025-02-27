const express = require('express');
const incidentController = require('../controllers/incidentController.js'); 
const { authenticate, authorizeGovOfficial } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', authenticate, incidentController.reportIncident);
router.get('/', authenticate, authorizeGovOfficial, incidentController.getAllIncidents);
router.get('/:id', authenticate, incidentController.getIncidentById);
router.patch('/:id', authenticate, authorizeGovOfficial, incidentController.updateIncidentStatus);
router.delete('/:id', authenticate, authorizeGovOfficial, incidentController.deleteIncident);

module.exports = router;
