const homeController = require('../controllers/home-controller');
const bookController = require('../controllers/books-controller');
module.exports = (app) => {
    app.get('/', homeController.getIndex);

    app.get('/addBook', bookController.getAddBook);
    app.post('/addBook', bookController.postAddBook);

    app.get('/viewAllBooks', bookController.getAll);

    app.get('/bookDetails/:id', bookController.getBookDetails)
};