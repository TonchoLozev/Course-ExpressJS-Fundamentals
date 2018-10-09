const router = require('express').Router();
const encryption = require('./encryption');
const users = [];

router.get('/login', (req, res) => {
    const message = req.session.message;
    res.render('login', {message});
    req.session.message = '';
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const user = users.filter(u => u.username === username)[0];
    if (user) {
        const hashedPass = encryption.generateHashedPassword(user.salt, password);
        if (user.hashedPass === hashedPass) {
            req.session.user = {
                username: username
            };
            req.session.message = 'Login successful';
            return res.redirect('/');
        }
    }
    req.session.message = 'Incorrect credentials';
    res.redirect('/auth/login');
});

router.get('/register', (req, res) => {
    const message = req.session.message;
    res.render('register', {message});
    req.session.message = '';
});

router.post('/register', (req, res) => {
    const {username, password, repeat} = req.body;

    if (password !== repeat) {
        req.session.message = 'Password and repeat password are different!';
        return res.redirect('/auth/register')
    }
    if (users.filter(user => user.username === username).length > 0) {
        req.session.message = 'Username already exists';
        return res.redirect('/auth/register')
    }

    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, password);

    users.push({username, hashedPass, salt});

    req.session.user = {
        username: username
    };
    req.session.message = 'Registration successful!';

    return res.redirect('/');
});

module.exports = router;