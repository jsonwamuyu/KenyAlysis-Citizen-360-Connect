import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.Authorization || req.headers.authorization;
        if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

export const authorizeGovOfficial = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await db.query('SELECT role_id FROM Users WHERE id = @userId', { userId });
        
        if (!result.recordset.length || result.recordset[0].role_id !== 2) {
            return res.status(403).json({ success: false, message: 'Access denied. Government officials only.' });
        }
        
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
    }
};
