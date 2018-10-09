const app = require('express')();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRouter = require('./auth');

const products = [
    {name: 'Apple', price: 1.15},
    {name: 'Banana', price: 2.43},
    {name: 'Cucumber', price: 2.20},
    {name: 'Tomato', price: 1.30},
    {name: 'Pineapple', price: 4.50},
    {name: 'Carrot', price: 1.20},
    {name: 'Blueberry', price: 8.00},
    {name: 'Strawberry', price: 6.20}
];

app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(cookieParser());
app.use(session({
    secret: 'generateSecret@!'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
//middleware that will check is user authenticated for every route
// app.use((req, res, next) => {
//     if (!req.session.user) {
//         return res.redirect('/auth/login');
//     }
//     next();
// });

function isAuthenticated(req, res, next){
    if(!req.user){
        return res.redirect('/auth/login');
    }
    next();
}

app.get('/', (req, res) => {
    const message = req.session.message;
    const username = req.user ? req.user.username  : '' ;
    const itemsCount = req.session.cart ? req.session.cart.length : 0;
    res.render('index', {
        products,
        itemsCount,
        //username,
        message});
    req.session.message = '';
});

app.get('/add/:id', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const product = products[Number(req.params.id)];
    req.session.cart.push(product);
    res.redirect('/');
});

app.get('/readSession', (req, res) => {
    res.json(req.session);
});

app.get('/cart', isAuthenticated, (req, res) => {
    const cartProducts = req.session.cart || [];
    const itemsCount = cartProducts.length;
    const total = cartProducts.reduce((prev, curr) => prev + Number(curr.price), 0);

    res.render('cart', {cartProducts, itemsCount, total});
});

app.get('/remove/:id', (req, res) => {
    const cartProducts = req.session.cart || [];
    const id = Number(req.params.id);

    req.session.cart = cartProducts.filter((e, i) => i !== id);
    res.redirect('/cart');
});
app.listen(5000);