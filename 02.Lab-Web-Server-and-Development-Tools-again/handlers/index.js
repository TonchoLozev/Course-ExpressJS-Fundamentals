const homeHandler = require('./home');
const aboutHandler = require('./about');
const staticHandler = require('./static');
const bigFileHandler = require('./bigFileHandler');
const errorHandler = require('./error');

module.exports = [
    bigFileHandler,
    homeHandler,
    aboutHandler,
    staticHandler,
    errorHandler,
];