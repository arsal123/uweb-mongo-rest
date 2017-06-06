'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
    name: {
        type: String,
        required: 'Please enter name of base_category'
    },
    category_id: {
        type: String,
        required: 'Please enter name of category'    
    },
    desc: {
        type: String    
    },
    price: {
        type: Number
    },
    weight: {
        type: Number
    // Weight in grams
    },
    last_update: {
        type: Date,
        default: Date.now
    },
    img_path : {
        type: String
    }
});

module.exports = mongoose.model('item', item);