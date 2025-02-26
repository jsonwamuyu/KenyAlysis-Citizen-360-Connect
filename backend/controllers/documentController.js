const db = ('../config/db.js');
const Joi = require('joi');

const documentSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    title: Joi.string().max(255).required(),
    description: Joi.string().max(1000).required(),
    file_url: Joi.string().uri().required()
});

export const uploadDocument = async (req, res) => {
    try {
        const { error } = documentSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });
        
        const { user_id, title, description, file_url } = req.body;
        await db.query(
            'INSERT INTO Documents (user_id, title, description, file_url) VALUES (@user_id, @title, @description, @file_url)',
            { user_id, title, description, file_url }
        );
        res.json({ success: true, message: 'Document uploaded successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const getAllDocuments = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Documents');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) return res.status(400).json({ success: false, message: 'Invalid document ID' });
        
        const result = await db.query('SELECT * FROM Documents WHERE id = @id', { id });
        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) return res.status(400).json({ success: false, message: 'Invalid document ID' });
        
        await db.query('DELETE FROM Documents WHERE id = @id', { id });
        res.json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};