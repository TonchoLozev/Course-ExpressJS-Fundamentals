const dataBase = require('../config/dataBase');
const validateMovie = require('../helpers/validateAddMovie');


function addMovieHandler(req, res) {
    if (req.path === '/addMovie' && req.method === 'GET') {
        res.sendHtml('./views/addMovie.html');
    } else if (req.path === '/addMovie' && req.method === 'POST') {
        res.postData(req, res).then(movie => {
            dataBase.push(movie);
            console.log(dataBase);
            res.sendHtml('./views/viewAll.html');
        });
    } else {
        return true;
    }
}

module.exports = addMovieHandler;