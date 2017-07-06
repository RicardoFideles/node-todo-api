var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var promise = mongoose.connect('mongodb://localhost/TodoApp', {
  useMongoClient: true,
});

promise.then(function(db) {
    console.log(`Connect to mongodb ${db}`);
});

//Save new something
var Todo = mongoose.model('Todo', {
    text : {
        type: String
    },
    completed : {
        type:Boolean
    },
    completedAt : {
        type: Number
    }
});

var newTodo = new Todo({
    text : 'Cook dinner'
});

newTodo.save().then((res) => {
    console.log('Todo saved', res);
}, (err) => {
    console.log('Unable to save TODO', err);
});

var otherTodo = new Todo({
    text : 'Wash dishes',
    completed: false,
    completed: 123
});

otherTodo.save().then((res) => {
    console.log('Todo saved', res);
}, (err) => {
    console.log('Unable to save TODO', err);
});

