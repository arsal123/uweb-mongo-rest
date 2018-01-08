'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactUsSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter name of base_category'
    },
    email: {
        type: String    
    },
    comments: {
        type: String    
    },
    create_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('contact_us', contactUsSchema);