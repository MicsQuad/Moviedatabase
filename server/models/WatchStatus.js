const mongoose = require('mongoose');

const WatchStatus = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ['watched', 'to be watched'],
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'watchstatus' });

module.exports = WatchStatus;