const staticHandler = require('./staticHandler');
const homeHandler = require('./homeHandler');
const viewAllHandler = require('./viewAllHandler');

module.exports = [
    viewAllHandler,
    homeHandler,
    staticHandler
];