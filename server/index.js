const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const homeRoutes = require('./routes/home');
const movieRoutes = require('./routes/movies');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const favouriteRoutes = require('./routes/favourite');
const watchlistRoutes = require('./routes/watchlist');

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
app.use('/api', watchlistRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Movie Database API!');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})