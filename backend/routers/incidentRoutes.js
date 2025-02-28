const express = require('express');
const incidentController = require('../controllers/incidentController.js'); 
const { authenticate, authorizeGovOfficial } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// router.post('/report-incident', authenticate, incidentController.reportIncident);
router.post('/report-incident', incidentController.reportIncident);

// router.get('/get-all-incidents', authenticate, authorizeGovOfficial, incidentController.getAllIncidents);


router.get('/get-all-incidents', incidentController.getAllIncidents);

// router.get('/:id', authenticate, incidentController.getIncidentById);
router.get('/:id', incidentController.getIncidentById);


// router.patch('/:id', authenticate, authorizeGovOfficial, incidentController.updateIncidentStatus);
router.patch('/:id', incidentController.updateIncidentStatus);

// router.delete('/:id', authenticate, authorizeGovOfficial, incidentController.deleteIncident);
router.delete('/:id', incidentController.deleteIncident);

module.exports = router;
