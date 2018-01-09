'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {
        type: String,
        required: 'Please enter name of category'
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
    },
    parent_id: {
        type: String
    },
    base_category_id: {
        type: String
    }
});

module.exports = mongoose.model('category', categorySchema);