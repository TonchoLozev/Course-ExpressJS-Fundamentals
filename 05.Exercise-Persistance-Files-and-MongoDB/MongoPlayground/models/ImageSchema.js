const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {type: String, required: true},
    creationDate: {type: Date, required: true, default: Date.now},
    description: {type: String},
    tags: [{type: mongoose.SchemaTypes.ObjectId}]
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;