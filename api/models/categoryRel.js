'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoryRelSchema = new Schema({
    item_id: {
        type: String
    },
    category_id: {
        type: String,
        required: 'Please enter name of category'    
    },
    sub_category_id: {
        type: String
    }
});

module.exports = mongoose.model('category_rel', categoryRelSchema);