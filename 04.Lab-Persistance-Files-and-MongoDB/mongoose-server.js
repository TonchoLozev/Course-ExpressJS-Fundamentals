const mongoose = require('mongoose');

const Cat = mongoose.model('Cat', {
    name: {type: String, required: true},
    age: {type: Number, required: true},
    color: {type: String, required: true}
});

mongoose.connect('mongodb://localhost:27017/jorkovci').then(() => {
    let newCat = new Cat({
        name: "Goshko",
        age: 500,
        color: "New Black"
    });

    newCat.save();
});