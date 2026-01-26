import jwt from "jsonwebtoken";
import User from "../models/User.js";

function generateToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-passwordHash');

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token.' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired.' });
        }
    console.error('Token verification error:', error);
    return res.status(500).json({ message: 'Internal server error verifying token.' });
  }
}

export default {generateToken, authenticateToken};