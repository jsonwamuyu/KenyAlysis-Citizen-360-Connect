// incidentRoutes.js
import express from 'express';
import incidentController from '../controllers/incidentController.js';
import { authenticate, authorizeGovOfficial } from '../middlewares/authMiddleware.js';

const incidentRouter = express.Router();

incidentRouter.post('/', authenticate, incidentController.reportIncident);
incidentRouter.get('/', authenticate, authorizeGovOfficial, incidentController.getAllIncidents);
incidentRouter.patch('/:id', authenticate, authorizeGovOfficial, incidentController.updateIncidentStatus);

export default incidentRouter;



