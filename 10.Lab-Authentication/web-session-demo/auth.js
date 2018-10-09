const passport = require('passport');
const router = require('express').Router();
const encryption = require('./encryption');
const LocalPassport = require('passport-local');

const users = [];

passport.use(new LocalPassport((username, password, done) => {
    const user = users.filter(u => u.username === username)[0];
    if (user) {
        const hashedPass = encryption.generateHashedPassword(user.salt, password);
        if (user.hashedPass === hashedPass) {
            return done(null, user);
        }
    }
    return done(null, false);
}));

passport.serializeUser((user, done) => {
    if (user) {
        return done(null, user._id);
    }
});

passport.deserializeUser((id, done) => {
    const user = users.filter(u => u._id === id)[0];
    if (user) {
        return done(null, user);
    }
    return done(null, false);
});

router.get('/login', (req, res) => {
    const message = req.session.message;
    res.render('login', {message});
    req.session.message = '';
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    req.session.message = 'Login successful';
    res.redirect('/');
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
    const user = {_id: encryption.generateId(), username, hashedPass, salt};

    users.push(user);

    req.login(user, err => {
        if (err) {
            req.session.message = 'Something went wrong';
            return res.redirect('/auth/register')
        }
        req.session.user = {
            username: username
        };
        req.session.message = 'Registration successful!';

        return res.redirect('/');
    });
});

module.exports = router;