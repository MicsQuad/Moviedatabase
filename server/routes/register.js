const express = require('express');
const Member = require('../models/Member.js');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;

    // Check if fields are provided
    if (!email || !password || !username) {
        return res.status(400).json({ message: 'Email, password, and username are required' });
    }

    try {
        // Check if the member already exists (by email)
        const existingMember = await Member.exists({ email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Create a new member
        const newMember = new Member({
            email,
            password,  // Store password as plain text for this prototype
            username,
            role: 'member',  // Default role as 'member', you can change this logic as needed
        });

        // Save the new member to the database
        await newMember.save();

        // Send success message
        res.status(201).json({
            message: 'Registration successful',
            member: { username: newMember.username, email: newMember.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
