const router = require('express').Router();

const Thread = require('../models/Thread');

const getHome = (req, res) => {
  if (req.isAuthenticated()) {
    Thread
      .find({userNames: req.user.username})
      .then(threads => {

        threads
          .map(t => t.toChatWith = req.user.username === t.secondUsername ? t.firstUsername : t.secondUsername)
          .sort((a, b) => new Date(a) - new Date(b));

        res.render('home/index', {threads});
      });
    return;
  }
  res.render('home/index');
};

router
  .get('/', getHome)

module.exports = router;