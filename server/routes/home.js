const express = require('express');
const Movie = require('../models/Movie.js');
const router = express.Router();

// GET all movies for home page
router.get('/home', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch movies' });
    }
});

module.exports = router;
