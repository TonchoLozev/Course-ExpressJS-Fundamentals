const app = require('express')();
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(session({
    secret: 'generateSecret@!'
}));

app.get('/', (req, res) => {
    res.end('<a href="/getCookie">Read Cookie</a><br><a href="/setCookie">Set Cookie</a><br><a href="/count">Count</a>');
});

app.get('/setCookie', (req, res) => {
    //res.cookie('message', 'hello from cookie');    req.session.message = 'hello from session';
    res.end('Session set')
});
app.get('/getCookie', (req, res) => {
    // res.json(req.cookies);
    res.json(req.session);
});
app.get('/count', (req, res) => {
    //const count = Number(req.cookies.count) || 0;
    const count = Number(req.session.count) || 0;
    //res.cookie('count', count + 1);
    req.session.count = count + 1;
    res.redirect('/');
});

app.listen(5000);