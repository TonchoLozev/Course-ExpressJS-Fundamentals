const Book = require('../data/book');

module.exports = {
    getIndex: (req, res) =>{
        Book.count().then(booksCount => {
            res.render('index', {booksCount})
        })
    }
};