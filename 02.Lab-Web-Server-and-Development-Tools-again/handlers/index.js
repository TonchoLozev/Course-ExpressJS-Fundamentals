const homeHandler = require('./home');
const aboutHandler = require('./about');
const staticHandler = require('./static');
const errorHandler = require('./error');

module.exports = [
    homeHandler,
    aboutHandler,
    staticHandler,
    errorHandler,
];