'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var user = new Schema({
    username: {
        type: String,
        required: 'Please enter name of username'
    },
    password: {
        type: String    
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', user);