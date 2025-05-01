const express = require('express');
const dotenv = require('dotenv');
const { Movie } = require('../models/models');

dotenv.config();

const router = express.Router();
const API_KEY = process.env.API_KEY;

// GET movie by title
router.get('/search', async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: 'Title query is required' });
    }

    try {
        // Check MongoDB cache
        const cachedMovie = await Movie.findOne({ title });
        if (cachedMovie) {
            return res.json(cachedMovie);
        }

        // Fetch from OMDb
        const omdbResponse = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`);
        const data = await omdbResponse.json();

        if (data.Response === 'False') {
            return res.status(404).json({ error: data.Error });
        }

        const { Title, Genre, Year, Language, imdbRating, Plot, Poster } = data;

        const newMovie = new Movie({
            title: Title,
            genre: Genre,
            releaseYear: parseInt(Year),
            language: Language,
            imdbRating: imdbRating,
            description: Plot,
            posterUrl: Poster,
        });

        await newMovie.save();

        res.status(201).json(newMovie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching movie from OMDb' });
    }
});

module.exports = router;
