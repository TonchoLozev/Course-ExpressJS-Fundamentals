const router = require('express').Router();

const User = require('../models/User');
const Thread = require('../models/Thread');
const Message = require('../models/Message');

const postFindThread = (req, res) => {
  const username = req.body.username;

  res.redirect('/threads/' + username);
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
        .findOne({
          userNames: {$all: [currentUsername, username]}
        })
        .populate('messages')
        .then(thread => {
          if (!thread) {
            const newThread = {
              firstUsername: currentUsername,
              secondUsername: username,
              userNames: [currentUsername, username]
            };
            Thread
              .create(newThread)
              .then(thread => {
                res.render('threads/chatroom', thread);
              });
            return;
          }

          thread.messages.map(msg => {
            if (msg.text.startsWith('http')) {
              if (msg.text.endsWith('jpg') || msg.text.endsWith('jpeg') || msg.text.endsWith('png')) {
                msg.isImage = true;
              } else {
                msg.isLink = true;
              }
            }
            msg.isCurrentUserMessage = msg.authorId.toString() === req.user._id.toString();
          });

          thread.isNotBlocked = !thread.blockedUsers.includes(currentUsername);
          thread.otherUserIsBlocked = thread.blockedUsers.includes(username);
          thread.username = username;
          res.render('threads/chatroom', thread);
        })
    });
};

const postChatMessage = (req, res) => {
  const message = req.body.message;
  const threadId = req.body.threadId;

  Thread
    .findById(threadId)
    .populate('messages')
    .then(thread => {
      if (!thread) {
        return res.redirect('/');
      }

      const messageToPost = {
        text: message,
        authorId: req.user._id
      };

      Message
        .create(messageToPost)
        .then(message => {
          thread.messages.push(message._id);
          thread
            .save()
            .then(() => {
              res.redirect('/threads/' + req.params.username);
            })
        })
        .catch(err => {
          res.redirect('/threads/' + req.params.username);
        });
    })
};

const postBlockUser = (req, res) => {
  const username = req.params.username;
  const threadId = req.body.threadId;

  Thread
    .findById(threadId)
    .then(thread => {
      if (!thread) {
        return res.redirect('/');
      }

      thread.blockedUsers.push(username);
      thread.save();
      res.redirect('/');
    })
}

const postUnBlockUser = (req, res) => {
  const username = req.params.username;
  const threadId = req.body.threadId;

  Thread
    .findById(threadId)
    .then(thread => {
      if (!thread) {
        return res.redirect('/');
      }


      thread.blockedUsers.splice(thread.blockedUsers.indexOf(username), 1);

      thread.save();
      res.redirect('/');
    })
}

const postLikeMessage = (req, res) => {
  const msgId = req.params.msgId;
  const authorId = req.params.authorId;

  User
    .findById(authorId)
    .then(user => {
      Message
        .findById(msgId)
        .then(message => {

          message.isLiked = !message.isLiked;

          message.save();
          res.redirect('/threads/' + user.username);
        });
    })
};

router
  .post('/find', postFindThread)
  .get('/:username', getChatRoom)
  .post('/:username', postChatMessage)
  .post('/:username/block', postBlockUser)
  .post('/:username/unblock', postUnBlockUser)
  .post('/:authorId/message-like/:msgId', postLikeMessage);

module.exports = router;