const mongoose = require('mongoose');

const movie = new mongoose.Schema({
    title: {type: String, required: true},
    genre: {type: String, required: true},
    releaseYear: {type: Number, required: true},
    language: {type: String, required: true},
    imdbRating: {type: Number},
    description: {type: String},
    posterUrl: String,
}, { collection: 'movie'}); // Collection name

module.exports = movie;
