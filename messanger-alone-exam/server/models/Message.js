const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  text: {type: String, maxlength: 1000},
  authorId: {type: String, required: true},
  isLiked: {type: Boolean, default: false}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;