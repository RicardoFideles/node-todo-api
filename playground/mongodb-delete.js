//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //Object destructring

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to the database server');
    }

    console.log('MongoDB connected!');

    //deleteMany
    /*
    db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (err) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
    });
    */

    //deleteOne
    /*
    db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (err) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
    });
    */

    //findOneAndDelete
     db.collection('Todos').findOneAndDelete({text:'Walk to do'}).then((result) => {
        console.log(result);
    }, (err) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
    });

    //db.close();
});

