const express = require('express');
const bcrypt = require('bcrypt');
const { Member } = require('../models/models.js');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if fields are provided
    if (!email || !password) {
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

        // If the password matches, return success
        res.json({
            message: 'Login successful',
            user: { id: memberData._id, username: memberData.username }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
