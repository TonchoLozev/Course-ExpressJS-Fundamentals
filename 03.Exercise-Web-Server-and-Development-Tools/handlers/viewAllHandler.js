const dataBase = require('../config/dataBase');

function viewAllHandler(req, res) {
    if (req.path === '/viewAllMovies') {
        console.log(dataBase);
        res.sendHtml('./views/viewAll.html');
    }else{
        return true;
    }
}

module.exports = viewAllHandler;