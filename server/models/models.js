const mongoose = require('mongoose');
const dotenv = require('dotenv');
const memberSchema = require('./Member.js');
const movieSchema = require('./Movie.js');
const favouriteSchema = require('./Favourite.js');

dotenv.config();

const userConnection = mongoose.createConnection(process.env.MONGO_URI_USER,{});

const movieConnection = mongoose.createConnection(process.env.MONGO_URI_MOVIE,{});

const Member = userConnection.model('Member', memberSchema);
const Movie = movieConnection.model('Movie', movieSchema);
const Favourite = movieConnection.model('Favourite', favouriteSchema);

module.exports = {
    Member,
    Movie,
    Favourite,
};