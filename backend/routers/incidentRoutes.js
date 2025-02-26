// // incidentRoutes.js
// const express = require('express');
// const incidentController = require('../controllers/incidentController.js');
// const { authenticate, authorizeGovOfficial } = require('../middlewares/authMiddleware.js');

// const incidentRouter = express.Router();

// incidentRouter.post('/', authenticate, incidentController.reportIncident);
// incidentRouter.get('/', authenticate, authorizeGovOfficial, incidentController.getAllIncidents);
// incidentRouter.patch('/:id', authenticate, authorizeGovOfficial, incidentController.updateIncidentStatus);

// module.exports =  incidentRouter;



const express = require('express')
const {identifyUser} = require('../middlewares/identification')
const incidentController = require('../controllers/incidentController')

const router = express.Router()

router.get('/all-incidents', incidentController.getAllIncidents)
router.post('/create-incident', incidentController.createIncident)
router.patch('/:id/status', incidentController.updateIncidentStatus)
router.delete('/:id/delete', incidentController.deleteInstance)


module.exports = router