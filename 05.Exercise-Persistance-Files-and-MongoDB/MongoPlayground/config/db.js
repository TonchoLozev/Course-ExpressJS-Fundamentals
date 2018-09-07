const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//when we import the models/schemas like this the we can access then anywhere via require('mongoose').model('modelname')
// and we will have all the crud operations in the collection that is using this schema

require('../models/ImageSchema');
require('../models/TagSchema');

const connectionString = `mongodb://localhost:27017/mongoplayground`;

module.exports = mongoose.connect(connectionString);