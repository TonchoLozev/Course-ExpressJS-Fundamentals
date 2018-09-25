const bodyParser = require('body-parser');
const Book = require('../data/book');

module.exports = {
    getAddBook: (req, res) => {
        res.render('books/addBooks')
    },
    postAddBook: (req, res) => {
        const book = req.body;

        if (!book.title || !book.imageUrl) {
            book.error = 'Title and Image Url are required!';
            res.render('books/addBooks', book)
        }

        book.releaseDate = new Date(book.releaseDate);

        Book.create(book).then(() => {
            res.redirect('/');
        })
    },
    getAll: (req, res) => {
        Book.find({}).sort('-releaseDate').then(books => {
            res.render('books/allBooks', {books})
        });
    },
    getBookDetails: (req, res) => {
        const id = req.params.id;

        Book.findById(id).then(book => {
            res.render('books/details', book)
        }).catch(err => console.log(err));
    }
};