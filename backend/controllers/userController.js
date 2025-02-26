const db = ('../config/db.js');
const Joi = require('joi');

const updateRoleSchema = Joi.object({
    role_id: Joi.number().integer().valid(1, 2, 3).required()
});

export const getAllUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT id, name, email, role_id, created_at FROM Users');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) return res.status(400).json({ success: false, message: 'Invalid user ID' });
        
        const result = await db.query('SELECT id, name, email, role_id, created_at FROM Users WHERE id = @id', { id });
        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) return res.status(400).json({ success: false, message: 'Invalid user ID' });
        
        const { error } = updateRoleSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });
        
        const { role_id } = req.body;
        await db.query('UPDATE Users SET role_id = @role_id WHERE id = @id', { id, role_id });
        res.json({ success: true, message: 'User role updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) return res.status(400).json({ success: false, message: 'Invalid user ID' });
        
        await db.query('DELETE FROM Users WHERE id = @id', { id });
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};
