const db = require('../config/db.js');
const Joi = require('joi');

const feedbackSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    message: Joi.string().max(1000).required()
});

const submitFeedback = async (req, res) => {
    try {
        const { error } = feedbackSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });
        
        const { user_id, message } = req.body;
        await db.query(
            'INSERT INTO Feedback (user_id, message) VALUES (@user_id, @message)',
            { user_id, message }
        );
        res.json({ success: true, message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const getAllFeedback = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Feedback');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) return res.status(400).json({ success: false, message: 'Invalid feedback ID' });
        
        await db.query('DELETE FROM Feedback WHERE id = @id', { id });
        res.json({ success: true, message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};


module.exports = {submitFeedback, getAllFeedback, deleteFeedback}