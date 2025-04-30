const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    releaseYear: Number,
    language: String,
    imdbRating: Number,
    description: String,
    posterUrl: String,
});

module.exports = mongoose.model('Movie', movieSchema);
