const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var model = User;
var modelText = "User";

var id = '535e853dfde5ab98358b3fca';

if (!ObjectID.isValid(id)) {
    console.log('Not Valid');
} else {
    console.log('Valid ID');
}

model.find({_id : id}).then((els) => {
    if (!els || els.length === 0) {
        return console.log(`No ${modelText} founds`);
    }
    console.log(`${modelText} :  ${els}`);
});

model.findOne({_id : id}).then((element) => {
    if (!element) {
        return console.log(`${modelText} not found`);
    }
    console.log(`${modelText} : ${element}`);
});

model.findById(id).then((element) => {
    if (!element) {
        return console.log('ID not found');
    }
    console.log(`${modelText} by id :  ${element}`);
}).catch((e) => {
    console.log(e);
});