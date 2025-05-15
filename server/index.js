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

const allowedOrigins = [
    'http://localhost:5173',               // Local frontend dev server
    'https://moviedatabase-1-byk7.onrender.com' // Deployed frontend URL
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like Postman or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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

app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: 'CORS policy does not allow this origin.' });
    }
    next(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
