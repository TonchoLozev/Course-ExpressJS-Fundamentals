const controllers = require('../controllers');
const auth = require('./auth');

module.exports = (app) => {
    app.get('/', controllers.home.index);
    app.get('/index.html', controllers.home.index);

    app.get('/users/register', controllers.users.registerGet);
    app.post('/users/register', controllers.users.registerPost);
    app.get('/users/login', controllers.users.loginGet);
    app.post('/users/login', controllers.users.loginPost);
    app.post('/users/logout', controllers.users.logout);

    app.get('/product/create', controllers.product.createGet);
    app.post('/product/create', controllers.product.createPost);

    app.get('/order/place/:id', controllers.order.placeGet);
    app.post('/order/place/:id', controllers.order.placePost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found!');
        res.end()
    })
};
