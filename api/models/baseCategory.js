'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var baseCategorySchema = new Schema({
    name: {
        type: String,
        required: 'Please enter name of base_category'
    },
    desc: {
        type: String    
    },
    last_update: {
        type: Date,
        default: Date.now
    },
    img_path : {
        type: String
    }
});

module.exports = mongoose.model('base_category', baseCategorySchema);