const router = require('express').Router();

const User = require('../models/User');
const Thread = require('../models/Thread');

const postFindUsername = (req, res) => {
  res.redirect('/threads/chatroom/' + req.body.username);
};

const getChatRoom = (req, res) => {
  const username = req.params.username;
  const currentUsername = req.user.username;

  if (username === currentUsername) {
    return res.redirect('/');
  }

  User
    .findOne({username})
    .then(user => {
      if (!user) {
        return res.redirect('/');
      }

      Thread
        .findOne()
      res.render('threads/chatroom');
    });

};

router
  .post('/find', postFindUsername)
  .get('/chatroom/:username', getChatRoom);

module.exports = router;