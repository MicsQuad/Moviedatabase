const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movies.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('api/movies', movieRoutes);


const PORT = process.env.PORT; // You can choose any port you prefer

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error(err));
