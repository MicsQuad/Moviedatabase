const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Member } = require('../models/models.js');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Access denied. Invalid token.' });
    }
}

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if fields are provided
    if (!email || !password) {
        console.log("Missing:", { email, password }); // ⬅️ Add this
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if the member exists
        const memberData = await Member.findOne({ email });
        if (!memberData) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // Check if the password matches using bcrypt
        const match = await bcrypt.compare(password, memberData.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // Token expires after 1 hour
        // User has to login again
        const token = jwt.sign(
            { id: memberData._id, email: memberData.email, },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // If the password matches, return success
        res.json({
            message: 'Login successful',
            user: { id: memberData._id, username: memberData.username },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/check-auth', authenticateToken, (req, res) => {
    res.json({ loggedIn: true, user: req.user });
});

module.exports = router;
