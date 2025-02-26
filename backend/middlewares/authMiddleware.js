const jwt = require('jsonwebtoken');
const db = require('../config/db.js');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.Authorization || req.headers.authorization;
        if (!token) return res.status(401).json({ success: false, message: 'No token provided.' });

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

const authorizeGovOfficial = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await db.request()
            .input('id', db.Int, userId)
            .query('SELECT role_id FROM Users WHERE id = @id');

        if (!result.recordset.length || result.recordset[0].role_id !== 2) {
            return res.status(403).json({ success: false, message: 'Government officials only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
    }
};

const authorizeAdmin = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await db.request()
            .input('id', db.Int, userId)
            .query('SELECT role_id FROM Users WHERE id = @id');

        if (!result.recordset.length || result.recordset[0].role_id !== 3) {
            return res.status(403).json({ success: false, message: 'Admins only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
    }
};


module.exports = { authenticate, authorizeGovOfficial, authorizeAdmin };
