const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./devConfig');
const routes = require('./routes');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler')


const app = express();

mongoose.connect(config.DB_CONNECTION);
mongoose.connection.on('error', console.log.bind(console, `connection error`));
mongoose.connection.once('open', console.log.bind(console, `DB connected`));

app.use(cors());
app.use(express.json()); //IMPORTANT FOR REST API parse body to json

app.use(auth);

app.get('/', (req, res) => {
    res.json({ message: `It's working!` });
});

app.use('/api', routes);
app.use(errorHandler);

app.listen(config.PORT, console.log.bind(console, `Server is listening on port ${config.PORT}...`));