const db = require('../config/db.js');
const Joi = require('joi');

const feedbackSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    message: Joi.string().max(1000).required()
});

const submitFeedback = async (req, res) => {
    try {
      const { error } = feedbackSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
  
      const { user_id, message } = req.body;
  
      // Validate that user_id is a number
      if (!/^\d+$/.test(user_id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
      }
  
      // Get database connection
      const pool = await poolPromise;
  
      // Insert feedback
      await pool
        .request()
        .input('user_id', sql.Int, user_id)
        .input('message', sql.NVarChar, message)
        .query('INSERT INTO Feedback (user_id, message) VALUES (@user_id, @message)');
  
      res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error(error); // Log the full error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

const getAllFeedback = async (req, res) => {
    try {
      // Get database connection
      const pool = await poolPromise;
  
      // Retrieve all feedback
      const result = await pool.request().query('SELECT * FROM Feedback');
  
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error(error); // Log the full error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

const deleteFeedback = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate that `id` is a number
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({ success: false, message: 'Invalid feedback ID' });
      }
  
      // Get database connection
      const pool = await poolPromise;
  
      // Check if the feedback exists
      const existingFeedback = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Feedback WHERE id = @id');
  
      if (existingFeedback.recordset.length === 0) {
        return res.status(404).json({ success: false, message: 'Feedback not found' });
      }
  
      // Delete feedback
      await pool
        .request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Feedback WHERE id = @id');
  
      res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
    } catch (error) {
      console.error(error); // Log the full error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };


module.exports = {submitFeedback, getAllFeedback, deleteFeedback}