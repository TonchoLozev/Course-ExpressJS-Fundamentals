const staticHandler = require('./static');
const homeHandler = require('./home');
const aboutHandler = require('./about');
const bigFileHandler = require('../bigFileHandler');
const errorHandler = require('./error');

module.exports = [
    staticHandler,
    homeHandler,
    aboutHandler,
    bigFileHandler,
    errorHandler
];