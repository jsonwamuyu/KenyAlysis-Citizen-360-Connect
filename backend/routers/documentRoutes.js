import express from 'express';
import {
    uploadDocument,
    getAllDocuments,
    getDocumentById,
    deleteDocument
} from '../controllers/documentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes for managing documents
router.post('/', authenticate, uploadDocument);
router.get('/', authenticate, getAllDocuments);
router.get('/:id', authenticate, getDocumentById);
router.delete('/:id', authenticate, deleteDocument);

export default router;
