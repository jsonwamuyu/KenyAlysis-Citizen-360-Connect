const db = ('../config/db.js');
const Joi = require('joi');

const pollSchema = Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().max(1000).required(),
    expiry_date: Joi.date().iso().required(),
    created_by: Joi.number().integer().required()
});

const voteSchema = Joi.object({
    poll_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    vote_option: Joi.string().valid('Yes', 'No', 'Not Sure').required()
});

const createPoll = async (req, res) => {
    try {
        const { error } = pollSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });
        
        const { title, description, expiry_date, created_by } = req.body;
        await db.query(
            'INSERT INTO Polls (title, description, expiry_date, created_by) VALUES (@title, @description, @expiry_date, @created_by)',
            { title, description, expiry_date, created_by }
        );
        res.json({ success: true, message: 'Poll created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const getAllPolls = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Polls');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const getPollById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) return res.status(400).json({ success: false, message: 'Invalid poll ID' });
        
        const result = await db.query('SELECT * FROM Polls WHERE id = @id', { id });
        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Poll not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

 const voteOnPoll = async (req, res) => {
    try {
        const { error } = voteSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });
        
        const { poll_id, user_id, vote_option } = req.body;
        await db.query(
            'INSERT INTO PollVotes (poll_id, user_id, vote_option) VALUES (@poll_id, @user_id, @vote_option)',
            { poll_id, user_id, vote_option }
        );
        res.json({ success: true, message: 'Vote submitted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

module.exports = {voteOnPoll, createPoll,getAllPolls,getPollById}