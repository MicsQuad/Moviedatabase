const express = require('express');
const Member = require('../models/Member.js');
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
        const member = await Member.exists({ email });
        if (!member) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Now find the member since we know it exists
        const memberData = await Member.findOne({ email });

        // Check if the password matches
        if (memberData.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If the password matches, return success
        res.json({
            message: 'Login successful',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
