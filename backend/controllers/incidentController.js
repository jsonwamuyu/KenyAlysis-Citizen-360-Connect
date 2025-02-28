const { incidentSchema } = require("../middlewares/validator");
const {sql, poolPromise} = require("../config/db");

// To create an incident, user must be logged in(Add check at route level using a middleware)


 const reportIncident = async (req, res) => {
    try {
      // Validate request body
      const { error } = incidentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
  
      const { user_id, category, description, media_url, location } = req.body;
      const pool = await poolPromise; // Await the poolPromise
  
      await pool
        .request()
        .input('user_id', sql.Int, user_id)
        .input('category', sql.NVarChar, category)
        .input('description', sql.NVarChar, description)
        .input('media_url', sql.NVarChar, media_url)
        .input('location', sql.NVarChar, location)
        .query(
          'INSERT INTO IncidentReports (user_id, category, description, media_url, location) VALUES (@user_id, @category, @description, @media_url, @location)'
        );
  
      res.status(201).json({ success: true, message: 'Incident reported successfully' });
    } catch (error) {
      console.error(error); // Log the full error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

const getAllIncidents = async (req, res) => {
    try {
      const pool = await poolPromise; // Await the poolPromise
  
      const result = await pool.request().query('SELECT * FROM IncidentReports');
  
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

const getIncidentById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate that `id` is a number
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({ success: false, message: 'Invalid incident ID' });
      }
  
      const pool = await poolPromise; // Await the poolPromise to get the connection pool
  
      // Use parameterized query to prevent SQL injection
      const result = await pool
        .request()
        .input('id', sql.Int, id) // Define the input parameter
        .query('SELECT * FROM IncidentReports WHERE id = @id'); // Query with parameter
  
      // Check if the record exists
      if (result.recordset.length === 0) {
        return res.status(404).json({ success: false, message: 'Incident not found' });
      }
  
      // Respond with the incident data
      res.status(200).json({ success: true, data: result.recordset[0] });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

const updateIncidentStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate that `id` is a number
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({ success: false, message: 'Invalid incident ID' });
      }
  
      // Validate the status
      if (!['open', 'in_progress', 'resolved'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }
  
      const pool = await poolPromise; // Await the poolPromise to get the connection pool
  
      // Use parameterized query to prevent SQL injection
      await pool
        .request()
        .input('id', sql.Int, id) // Define the input parameter for id
        .input('status', sql.NVarChar, status) // Define the input parameter for status
        .query('UPDATE IncidentReports SET status = @status WHERE id = @id'); // Query with parameters
  
      res.status(200).json({ success: true, message: 'Incident status updated successfully' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

const deleteIncident = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate that `id` is a number
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({ success: false, message: 'Invalid incident ID' });
      }
  
      const pool = await poolPromise; // Await the poolPromise to get the connection pool
  
      // Use parameterized query to prevent SQL injection
      await pool
        .request()
        .input('id', sql.Int, id) // Define the input parameter
        .query('DELETE FROM IncidentReports WHERE id = @id'); // Query with parameter
  
      res.status(200).json({ success: true, message: 'Incident deleted successfully' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };
  
module.exports = {deleteIncident, updateIncidentStatus, getAllIncidents, getIncidentById, reportIncident}