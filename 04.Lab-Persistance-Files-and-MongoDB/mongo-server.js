const mongodb = require('mongodb');

const connection = 'mongodb://localhost:27017/pets';

mongodb.MongoClient.connect(connection).then(client => {
    const db = client.db('pets');

    const dogs = db.collection('dogs');

    //dogs.insertOne({"name": "Pesho", "age": 0.12, "color": "brown"});

    dogs.find({}).toArray((err, dogs) =>{
        console.log(dogs);
    })
});