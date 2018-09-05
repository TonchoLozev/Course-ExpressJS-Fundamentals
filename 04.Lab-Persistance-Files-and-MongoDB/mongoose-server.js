const mongoose = require('mongoose');

//*//right way of making model
const catSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    color: {type: String, required: true}
});

//adding method to the objects that are created by the cat schema and ar not saved in db
//no arrow function cuz "this" will break
catSchema.methods.sayHello = function () {
    return `Hello from ${this.name}`
};

//adding properties to the objects that are created by the cat schema and are not saved in db
catSchema.virtual('description').get(function () {
    return `Name: ${this.name}, Age ${this.age}`
});

//validate the creation of an cat schema/model object (when saving it in the db)
catSchema.path('age').validate(function () {
    return this.age >= 1 && this.age <= 20;
}, 'Age must be between 1 and 20');


//*//right way of making model
const Cat = mongoose.model('Cat', catSchema);

const Owner = mongoose.model('Owner', {
    name: {type: String, required: true},
    age: {type: Number, required: true},
    cats: [Cat.schema]
});

mongoose.connect('mongodb://localhost:27017/jorkovci').then(() => {
    //creating a model for the obj and saving it in db
    // let newCat = new Cat({
    //     name: "Pesho",
    //     age: 5,
    //     color: "Purple"
    // });
    //
    // newCat.save().then(cat => {
    //     console.log(cat)
    // }).catch(err => {
    //     console.log(err);
    // });

    //with our model/schema it wont give us the permission to create an invalid object
    // let newCat = new Cat({
    //     name: "Pesho",
    //     age: 0.3,
    // });
    //
    // newCat.save().then(cat => {
    //     console.log(cat)
    // }).catch(err => {
    //     console.log(err);
    // });

    //get all cats from db
    // Cat.find({}).then(cats => {
    //     console.log(cats);
    // })

    // Cat.findOne().then(cat => console.log(cat.description));

    // Cat.find({}).then(cats => {
    //     let owner = new Owner({
    //         name: 'Ivan',
    //         age: 18,
    //         cats: cats
    //     });
    //
    //     owner.save();
    // });

    //sort and minus is revrted order
    Cat.find()
        .where('age').gt(1).lt(501) //where the propery age is greater than 1 and less than 501
        .sort('-name') //sort tem by name but in reverted order
        .select('name age') //select only name and age properties
        //.skip(1) //skip the first one object of the array
        // .limit(1) //show only 1 obj of the array
        .then(cats => {
            console.log(cats)
        })
});