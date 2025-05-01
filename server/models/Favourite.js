const mongoose = require('mongoose');

const favourite = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'favourite'}); // Collection name

module.exports = favourite;
