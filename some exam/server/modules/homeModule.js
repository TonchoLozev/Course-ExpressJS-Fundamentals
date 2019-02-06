const router = require('express').Router();

const getHome = (req, res) => {
  if (req.isAuthenticated()) {
    res.render('home/user-home');
    return;
  }
  res.render('home/guest-home');
};

router
  .get('/', getHome)

module.exports = router;