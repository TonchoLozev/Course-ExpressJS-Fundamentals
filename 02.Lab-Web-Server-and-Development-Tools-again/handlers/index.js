const homeHandler = require('./home');
const aboutHandler = require('./about');
const staticHandler = require('./static');
const bigFileHandler = require('./bigFileHandler');
const dataHandler = require('./data');
const errorHandler = require('./error');

module.exports = [
    bigFileHandler,
    dataHandler,
    homeHandler,
    aboutHandler,
    staticHandler,
    errorHandler,
];