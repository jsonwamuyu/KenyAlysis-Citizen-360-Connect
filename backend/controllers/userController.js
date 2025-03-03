const {sql, poolPromise} = require("../config/db");
const Joi = require('joi');

const updateRoleSchema = Joi.object({
    role_id: Joi.number().integer().valid(1, 2, 3).required()
});


const getUserProfile = async (req, res) => {
    try {
      const pool = await poolPromise;
      const user = await pool.request()
        .input("userId", sql.Int, req.user.userId)
        .query("SELECT id, username, email, role_id FROM Users WHERE id = @userId");
  
      if (user.recordset.length === 0) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.json({ success: true, user: user.recordset[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  };
  
const getAllUsers = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query('SELECT id, username, email, role_id, created_at FROM Users'); // Corrected column name to 'username'
  
      res.json(result.recordset);
    } catch (error) {
        console.log(error)
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };
  

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!/^\d+$/.test(id)) return res.status(400).json({ success: false, message: 'Invalid user ID' });

        const pool = await poolPromise

        const user = await pool.request().input('id', sql.Int, id).query('SELECT id, username, email, role_id, created_at FROM Users WHERE id = @id');
        if (user.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(user.recordset[0]);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        if (!/^\d+$/.test(id)) return res.status(400).json({ success: false, message: 'Invalid user ID' });

        const { error } = updateRoleSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });

        const { role_id } = req.body;
        await db.request()
            .input('id', db.Int, id)
            .input('role_id', db.Int, role_id)
            .query('UPDATE Users SET role_id = @role_id WHERE id = @id');

        res.json({ success: true, message: 'User role updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!/^\d+$/.test(id)) return res.status(400).json({ success: false, message: 'Invalid user ID' });

        await db.request().input('id', db.Int, id).query('DELETE FROM Users WHERE id = @id');
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};


module.exports = {deleteUser, updateUserRole, getAllUsers, getUserById, getUserProfile}
