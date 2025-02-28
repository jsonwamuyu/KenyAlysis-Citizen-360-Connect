const express = require('express');
const {
    uploadDocument,
    getAllDocuments,
    getDocumentById,
    deleteDocument
} = require('../controllers/documentController.js');
const { authenticate, authorizeGovOfficial } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Routes for managing documents
router.post('/upload-document', authenticate, authorizeGovOfficial, uploadDocument);
router.get('/all-documents', authenticate, getAllDocuments);
router.get('/:id', authenticate, getDocumentById);
router.delete('/:id', authenticate,authorizeGovOfficial, deleteDocument);

module.exports = router;
