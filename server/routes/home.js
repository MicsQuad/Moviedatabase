const express = require('express');
const { Movie } = require('../models/models');
const router = express.Router();

// GET all movies for home page
router.get('/home', async (req, res) => {
    try {
        const movies = await Movie.find({}).limit(25);
        res.status(200).json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch movies' });
    }
});

module.exports = router;
