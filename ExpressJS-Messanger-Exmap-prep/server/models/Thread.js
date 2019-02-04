const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
    firstUsername: {type: String, required: true},
    secondUsername: {type: String, required: true},
    userNames: [{type: String, default: []}],
    date: {type: Date, default: Date.now},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    blockedUsers: [{type: String, default: []}]
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;