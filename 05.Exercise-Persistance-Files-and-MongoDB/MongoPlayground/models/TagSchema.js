const mongoose = require('mongoose');
const Image = require('./ImageSchema');

const tagSchema = new mongoose.Schema({
    name: {type: String, required: true},
    creationDate: {type: Date, required: true, default: Date.now},
    images: [{type: mongoose.SchemaTypes.ObjectId}]
});

tagSchema.virtual('tagName').get(function () {
    return this.name.toLowerCase();
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;