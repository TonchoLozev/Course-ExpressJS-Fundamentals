const express = require('express');
const settings = require('./config/settings');
const database = require('./config/db');
const server = require('./config/server');

const env = 'development';
const port = settings[env].port;
database(settings[env]);

const app = express();
server(app);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log(`Server up and running on port  ${port}`));