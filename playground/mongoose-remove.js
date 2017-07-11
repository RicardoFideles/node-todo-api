const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Remove all documents
/*
Todo.remove({}).then((res) => {
    console.log(res)
});
*/

/* find first and delete, but retrieve the document
Todo.findOneAndRemove({_id: '5963c705b4f2f0bc2667bfc7'}).then((doc) => {
    console.log(doc);
});
*/

/* find by ID and delete, but retrieve the document
Todo.findByIdAndRemove('5963c705b4f2f0bc2667bfc7').then((todo) => {
    console.log(todo);
});
*/