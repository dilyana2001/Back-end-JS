const express = require('express');

const config = require('./devConfig');
const routes = require('./routes');
const app = express();

require('./config/express')(app);
require('./config/mongoose')(app);

app.use(routes({}));

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`))