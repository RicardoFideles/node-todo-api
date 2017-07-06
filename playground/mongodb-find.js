//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //Object destructring

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to the database server');
    }

    console.log('MongoDB connected!');

    // db.collection('Todos').find({
    //         _id: new ObjectID('595e3cac91c12a8471d55988')
    //     }).toArray().then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // }, (err) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count : ${count}`);
    // }, (err) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    // });

    /* queryng docs -- toArray return the documents itself and not a cursor */
    db.collection('Users').find({name:"Ricardo"}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
    });

    db.close();
});

