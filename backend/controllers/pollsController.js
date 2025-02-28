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

const createPoll = async (req, res) =>  {
    try {
      const { error } = pollSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
  
      const { title, description, expiry_date, created_by } = req.body;
  
      // Validate that expiry_date is a valid date
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(expiry_date)) {
        return res.status(400).json({ success: false, message: 'Invalid expiry date format' });
      }
  
      // Get database connection
      const pool = await poolPromise;
  
      // Insert poll
      await pool
        .request()
        .input('title', sql.NVarChar(255), title)
        .input('description', sql.NVarChar(500), description)
        .input('expiry_date', sql.DateTime2, expiry_date)
        .input('created_by', sql.Int, created_by)
        .query(`
          INSERT INTO Polls (title, description, expiry_date, created_by) 
          VALUES (@title, @description, @expiry_date, @created_by)
        `);
  
      res.status(201).json({ success: true, message: 'Poll created successfully' });
    } catch (error) {
      console.error(error); // Log the full error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

const getAllPolls = async (req, res) => {
    try {
      const pool = await poolPromise; // Await the poolPromise to get the connection pool
  
      const result = await pool.request().query('SELECT * FROM Polls');
  
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

const getPollById = async (req, res) =>{
    try {
      const { id } = req.params;
  
      // Validate that `id` is a number
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({ success: false, message: 'Invalid poll ID' });
      }
  
      // Get database connection
      const pool = await poolPromise;
  
      // Use parameterized query to prevent SQL injection
      const result = await pool
        .request()
        .input('id', sql.Int, id) // Define the input parameter
        .query('SELECT * FROM Polls WHERE id = @id'); // Query with parameter
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ success: false, message: 'Poll not found' });
      }
  
      res.status(200).json(result.recordset[0]);
    } catch (error) {
      console.error(error); // Log the full error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

 const voteOnPoll = async (req, res) => {
    try {
      const { error } = voteSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
  
      const { poll_id, user_id, vote_option } = req.body;
  
      // Validate that poll_id and user_id are numbers
      if (!/^\d+$/.test(poll_id) || !/^\d+$/.test(user_id)) {
        return res.status(400).json({ success: false, message: 'Invalid poll ID or user ID' });
      }
  
      // Get database connection
      const pool = await poolPromise;
  
      // Check if the user has already voted
      const existingVote = await pool
        .request()
        .input('poll_id', sql.Int, poll_id)
        .input('user_id', sql.Int, user_id)
        .query('SELECT * FROM PollVotes WHERE poll_id = @poll_id AND user_id = @user_id');
  
      if (existingVote.recordset.length > 0) {
        return res.status(400).json({ success: false, message: 'You have already voted on this poll' });
      }
  
      // Insert vote
      await pool
        .request()
        .input('poll_id', sql.Int, poll_id)
        .input('user_id', sql.Int, user_id)
        .input('vote_option', sql.NVarChar, vote_option)
        .query('INSERT INTO PollVotes (poll_id, user_id, vote_option) VALUES (@poll_id, @user_id, @vote_option)');
  
      res.status(201).json({ success: true, message: 'Vote submitted successfully' });
    } catch (error) {
      console.error(error); // Log the full error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

module.exports = {voteOnPoll, createPoll,getAllPolls,getPollById}