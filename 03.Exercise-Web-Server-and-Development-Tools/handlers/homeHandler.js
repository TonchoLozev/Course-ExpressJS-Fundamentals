function homeHandler(req, res) {
    if (req.path === '/') {
        res.sendHtml('./views/home.html');
    }else{
        return true;
    }
}

module.exports = homeHandler;