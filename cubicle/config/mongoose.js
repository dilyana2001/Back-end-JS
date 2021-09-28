const mongoose = require('mongoose')

module.exports = (app) => {
    mongoose.connect('mongodb://localhost:27017/cubicle');

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    // db.once('open', console.log.bind(console, `Connected to database...`));
    db.once('open', () => console.log(`Connected to database...`));
}