const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const homeRoutes = require('./routes/home');
const movieRoutes = require('./routes/movies');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const favouriteRoutes = require('./routes/favourite');

// Database connections
const memberSchema = require('./models/Member');
const movieSchema = require('./models/Movie');
const favouriteSchema = require('./models/Favourite');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', homeRoutes);
app.use('/api', movieRoutes);
app.use('/api', loginRoutes);
app.use('/api', registerRoutes);
app.use('/api', favouriteRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Movie Database API!');
})

app.get('/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.status(200).json(movies);
})

const MONGO_URI_MOVIE = process.env.MONGO_URI_MOVIE;
const MONGO_URI_USER = process.env.MONGO_URI_USER;
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

// DO NOT USE mongoose.connect() for multiple databases
const userConnection = mongoose.createConnection(MONGO_URI_USER);

const movieConnection = mongoose.createConnection(MONGO_URI_MOVIE);

// Models
const Member = userConnection.model('Member', memberSchema);
const Movie = movieConnection.model('Movie', movieSchema);
const Favourite = movieConnection.model('Favourite', favouriteSchema);

module.exports = {
    Member,
    Movie,
    Favourite,
}

