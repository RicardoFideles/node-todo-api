var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var promise = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/TodoApp', {
  useMongoClient: true,
});

promise.then(function(db) {
    console.log(`Connect to mongodb ${db}`);
});

module.exports = {mongoose};