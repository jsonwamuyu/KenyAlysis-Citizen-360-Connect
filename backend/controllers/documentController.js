const Joi = require("joi");
const { poolPromise, sql } = require("../config/db");

const documentSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  title: Joi.string().max(255).required(),
  description: Joi.string().max(1000).required(),
  file_url: Joi.string().uri().required(),
});

const uploadDocument = async (req, res) => {
  try {
    const { error } = documentSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const { user_id, title, description, file_url } = req.body;

    // Get database connection
    const pool = await poolPromise;

    // Check if the user is a government official (role_id = 2)
    const userRole = await pool
      .request()
      .input('user_id', sql.Int, user_id)
      .query('SELECT role_id FROM Users WHERE id = @user_id');

    if (userRole.recordset.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    if (userRole.recordset[0].role_id !== 2) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            'Unauthorized: Only government officials can upload documents.',
        });
    }

    // Insert document
    await pool
      .request()
      .input('user_id', sql.Int, user_id)
      .input('title', sql.NVarChar(255), title)
      .input('description', sql.NVarChar(500), description)
      .input('file_url', sql.NVarChar(500), file_url)
      .query(`
        INSERT INTO Documents (user_id, title, description, file_url, uploaded_at) 
        VALUES (@user_id, @title, @description, @file_url, GETDATE())
      `);

    res
      .status(201)
      .json({ success: true, message: 'Document uploaded successfully' });
  } catch (error) {
    console.error(error); // Log the full error for debugging
    res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
  }
};

const getAllDocuments = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Documents");
    
        res.json({ success: true, documents: result.recordset });
      } catch (error) {
        console.error("Get All Documents Error:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }
    };

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)))
      return res
        .status(400)
        .json({ success: false, message: "Invalid document ID" });

    const result = await db.query("SELECT * FROM Documents WHERE id = @id", {
      id,
    });
    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }
    res.json(result.recordset[0]);
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

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id)))
      return res
        .status(400)
        .json({ success: false, message: "Invalid document ID" });

    await db.query("DELETE FROM Documents WHERE id = @id", { id });
    res.json({ success: true, message: "Document deleted successfully" });
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

module.exports = {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  deleteDocument,
};
