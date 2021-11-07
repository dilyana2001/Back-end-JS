const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    genres: String,
    tickets: Number
});

module.exports = mongoose.model('Movie', movieSchema);