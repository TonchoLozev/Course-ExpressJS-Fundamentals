function viewAllHandler(req, res) {
    if (req.path === '/viewAllMovies') {
        res.sendHtml('./views/viewAll.html');
    }else{
        return true;
    }
}

module.exports = viewAllHandler;