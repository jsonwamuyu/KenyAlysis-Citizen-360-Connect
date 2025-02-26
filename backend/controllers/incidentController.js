const { incidentSchema } = require("../middlewares/validator");


// To create an incident, user must be logged in(Add check at route level using a middleware)

const db = require("../config/db");

const reportIncident = async (req, res) => {
    try {
      // Validate request body
      const {error} = incidentSchema.validate(req.body)
        if(error){
          return res.status(400).json({success:false, message:error.details[0].message})
        }
        const {user_id, category, description, media_url, location} = req.body
        await db.query(
            'INSERT INTO IncidentReports (user_id, category, description, media_url, location) VALUES (@user_id, @category, @description, @media_url, @location)',
            { user_id, category, description, media_url, location }
        );
        res.json({ success: true, message: 'Incident reported successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const getAllIncidents = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM IncidentReports');
        res.json(result.recordset);
    } catch (error) {
      console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const getIncidentById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM IncidentReports WHERE id = @id', { id });
        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Incident not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const updateIncidentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await db.query('UPDATE IncidentReports SET status = @status WHERE id = @id', { id, status });
        res.json({ success: true, message: 'Incident status updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const deleteIncident = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM IncidentReports WHERE id = @id', { id });
        res.json({ success: true, message: 'Incident deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

module.exports = {deleteIncident, updateIncidentStatus, getAllIncidents, getIncidentById, reportIncident}