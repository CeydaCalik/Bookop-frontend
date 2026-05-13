const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.route');

const favoriteRoute = require('./routes/favoriteBook.route');


const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use('/api/favorites', favoriteRoute);


app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send("API running");
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
    
})
