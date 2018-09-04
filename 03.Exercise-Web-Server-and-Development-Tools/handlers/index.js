const staticHandler = require('./staticHandler');
const homeHandler = require('./homeHandler');
const viewAllHandler = require('./viewAllHandler');
const addMovieHandler = require('./addMovieHandler');

module.exports = [
    viewAllHandler,
    homeHandler,
    addMovieHandler,
    staticHandler
];