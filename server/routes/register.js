const express = require('express');
const bcrypt = require('bcrypt');
const { Member } = require('../models/models');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Register route
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // Check if fields are provided
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Email, password, and username are required' });
    }

    try {
        // Check if the member already exists (by email)
        const existingMember = await Member.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new member
        const newMember = new Member({
            username,
            password: hashedPassword,
            email,
        });

        // Save the new member to the database
        await newMember.save();
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
