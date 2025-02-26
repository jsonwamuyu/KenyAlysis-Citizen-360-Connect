import express from 'express';
import {
    reportIncident,
    getAllIncidents,
    getIncidentById,
    updateIncidentStatus,
    deleteIncident
} from '../controllers/incidentController.js';
import { authenticate, authorizeGovOfficial } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes for managing incidents
router.post('/', authenticate, reportIncident);
router.get('/', authenticate, authorizeGovOfficial, getAllIncidents);
router.get('/:id', authenticate, getIncidentById);
router.patch('/:id', authenticate, authorizeGovOfficial, updateIncidentStatus);
router.delete('/:id', authenticate, authorizeGovOfficial, deleteIncident);

export default router;
