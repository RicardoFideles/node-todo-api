
const mongoose = require('mongoose');
const validator = require('validator');
//const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const secret = 'abc123';

var UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        trim: true,
        minlenght: 1,
        unique: true, 
        validate : {
            validator : validator.isEmail, 
            message : '{VALUE}, invalid e-mail'
        }
    },
    password : {
        type : String,
        require : true,
        minlenght : 6
    },
    tokens : [{
        access : {
            type: String,
            require: true
        },
        token : {
            type: String,
            require: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(), access}, secret).toString();
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token;
    });
};


UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        _id : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    });

};


var User = mongoose.model('User', UserSchema);

module.exports =  {User};