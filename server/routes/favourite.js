const express = require('express');
const { Favourite, Member, Movie } = require('../models/models');
const router = express.Router();

// Add movie to favourites
router.post('/favourite', async (req, res) => {
    const { memberId, movieId } = req.body;

    if (!memberId || !movieId) {
        return res.status(400).json({ message: 'Member ID and Movie ID are required' });
    }

    try {
        // Check if the member exists
        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        // Check if the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Create a new favourite
        const newFavourite = new Favourite({
            memberId,
            movieId,
        });

        await newFavourite.save();

        res.status(201).json({ message: 'Movie added to favourites', favourite: newFavourite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all favourite movies for a member
router.get('/favourites/:memberId', async (req, res) => {
    const { memberId } = req.params;

    try {
        // Find all favourites for the member
        const favourites = await Favourite.find({ memberId }).populate('movieId');

        if (favourites && favourites.length === 0) {
            return res.status(404).json({ message: 'No favourites found for this member' });
        }

        res.status(200).json(favourites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
