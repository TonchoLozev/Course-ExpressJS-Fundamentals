const router = require('express').Router();

const Thread = require('../models/Thread');
const Message = require('../models/Message');

const postFindThread = (req, res) => {
    const username = req.body.username;

    res.redirect('/threads/' + username);
};

const getChatRoom = (req, res) => {
    const username = req.params.username;
    const currentUsername = req.user.username;

    if(username === currentUsername){
        return res.redirect('/');
    }

    Thread
        .findOne({
            firstUsername: currentUsername,
            secondUsername: username
        })
        .then(thread => {
            if (!thread) {
                const newThread = {
                    firstUsername: currentUsername,
                    secondUsername: username,
                    userNames: [currentUsername, username]
                };
                Thread
                    .create(newThread)
                    .then(res => {
                        res.render('threads/chatroom', thread);
                    });
                return;
            }
            res.render('threads/chatroom', thread);
        })

};

const postChatMessage= (req, res) => {
    const message = req.body.message;
    const threadId = req.body.threadId;

    Thread
        .findById(threadId)
        .populate('messages')
        .then(thread => {
            if(!thread){
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
                       .then(()=>{
                           res.redirect('/threads/' + req.params.username);
                       })
                })
        })
};

router
    .post('/find', postFindThread)
    .get('/:username', getChatRoom)
    .post('/:username', postChatMessage);

module.exports = router;