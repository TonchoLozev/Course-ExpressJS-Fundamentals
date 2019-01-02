const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text: String,
    authorId: {type: String, required: true},
    isLiked: {type: Boolean, default: false}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;