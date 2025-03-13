// const db = require('../config/db.js');
const { sql, poolPromise } = require("../config/db");
const Joi = require("joi");

// Poll Validation Schema
const pollSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().max(500).required(),
  expiry_date: Joi.date().required(),
});

// Create a new poll (Admin Only)
exports.createPoll = async (req, res) => {
  try {
    const { error } = pollSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    const { title, description, expiry_date } = req.body;
    const created_by = req.user.userId;
    const pool = await poolPromise;
    await pool
      .request()
      .input("title", sql.NVarChar(255), title)
      .input("description", sql.NVarChar(500), description)
      .input("expiry_date", sql.Date, expiry_date)
      .input("created_by", sql.Int, created_by)
      .input("option_yes", sql.Int, 0)
      .input("option_no", sql.Int, 0)
      .input("option_not_sure", sql.Int, 0).query(`
              INSERT INTO Polls (title, description, expiry_date, created_by, option_yes, option_no, option_not_sure) 
              VALUES (@title, @description, @expiry_date, @created_by, @option_yes, @option_no, @option_not_sure)
          `);

    res
      .status(201)
      .json({ success: true, message: "Poll created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all polls
exports.getAllPolls = async (req, res) => {
  try {
    const pool = await poolPromise; // Ensure pool is initialized
    const result = await pool
      .request()
      .query("SELECT * FROM Polls WHERE expiry_date > GETDATE()");

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// exports.getAllPolls = async (req, res) => {{
//   try {
//     const pool = await db;
//     const user_id = req.user?.userId; // Get user ID from token

//     const polls = await pool.request().query("SELECT * FROM Polls WHERE expiry_date > GETDATE()");

//     for (let poll of polls.recordset) {
//       const checkVote = await pool.request()
//         .input("poll_id", poll.id)
//         .input("user_id", user_id)
//         .query("SELECT * FROM PollVotes WHERE poll_id = @poll_id AND user_id = @user_id");

//       poll.hasVoted = checkVote.recordset.length > 0;
//     }

//     res.json(polls.recordset);
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error", error: error.message });
//   }
// };

// Get a poll by ID
exports.getPollById = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure ID is an integer
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid poll ID" });
    }

    const pool = await poolPromise; // Ensure correct DB connection
    const result = await pool
      .request()
      .input("id", sql.Int, id) // Explicitly set type to Int
      .query("SELECT * FROM Polls WHERE id = @id");

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Poll not found" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Vote on a poll
exports.voteOnPoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { vote } = req.body; // Expected values: "yes", "no", "not_sure"
    const user_id = req.user.userId;

    // Validate vote input
    if (!["yes", "no", "not_sure"].includes(vote)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid vote option" });
    }

    // Connect to DB
    const pool = await poolPromise;

    // Check if user has already voted
    const checkVote = await pool
      .request()
      .input("poll_id", sql.Int, id)
      .input("user_id", sql.Int, user_id)
      .query(
        "SELECT * FROM PollVotes WHERE poll_id = @poll_id AND user_id = @user_id"
      );

    if (checkVote.recordset.length > 0) {
      return res.status(403).json({
        success: false,
        message: "You have already voted on this poll",
      });
    }

    console.log("req.user:", req.user);
    // Record the user's vote
    await pool
      .request()
      .input("poll_id", sql.Int, id)
      .input("user_id", sql.Int, user_id)
      .input("vote", sql.VarChar(10), vote)
      .query(
        "INSERT INTO PollVotes (poll_id, user_id, vote) VALUES (@poll_id, @user_id, @vote)"
      );

    // Safely update vote count in Polls table
    const voteColumn = `option_${vote}`;
    await pool
      .request()
      .input("poll_id", sql.Int, id)
      .query(
        `UPDATE Polls SET ${voteColumn} = ${voteColumn} + 1 WHERE id = @poll_id`
      );

    res.json({ success: true, message: "Vote recorded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error what happened",
      error: error.message,
    });
  }
};

// Check if the user has already voted on a poll
exports.hasUserVoted = async (req, res) => {
  try {
    const { id } = req.params; // Poll ID from URL
    const user_id = req.user.userId; // Get user ID from token

    const pool = await db;

    // Check if the user has already voted
    const checkVote = await pool
      .request()
      .input("poll_id", id)
      .input("user_id", user_id)
      .query(
        "SELECT * FROM PollVotes WHERE poll_id = @poll_id AND user_id = @user_id"
      );

    if (checkVote.recordset.length > 0) {
      return res.json({ success: true, hasVoted: true });
    } else {
      return res.json({ success: true, hasVoted: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get poll results

exports.getPollResults = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure database connection
    const pool = await poolPromise;

    // Fetch poll results
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        "SELECT option_yes, option_no, option_not_sure FROM Polls WHERE id = @id"
      );

    // Check if the poll exists
    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Poll not found" });
    }

    res.status(200).json({ success: true, results: result.recordset[0] });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a poll (Admin Only)
exports.deletePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise; // Ensure correct DB connection

    // Check if the poll exists
    const checkPoll = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT id FROM Polls WHERE id = @id");

    if (checkPoll.recordset.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Poll not found" });
    }

    // Delete votes associated with the poll first (to avoid foreign key constraint issues)
    await pool
      .request()
      .input("poll_id", sql.Int, id)
      .query("DELETE FROM PollVotes WHERE poll_id = @poll_id");

    // Delete the poll
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Polls WHERE id = @id");

    res.json({ success: true, message: "Poll deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
