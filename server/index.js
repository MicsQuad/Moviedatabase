const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const homeRoutes = require('./routes/home');
const movieRoutes = require('./routes/movies');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const favouriteRoutes = require('./routes/favourite');
const watchlistRoutes = require('./routes/watchlist');

dotenv.config();

const app = express();
app.use(cors({
    origin: 'moviedatabase-5ozm.vercel.app\n',
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', homeRoutes);
app.use('/api', movieRoutes);
app.use('/api', loginRoutes);
app.use('/api', registerRoutes);
app.use('/api', favouriteRoutes);
app.use('/api', watchlistRoutes);

// Use static files from React build
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Client side routing using index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
