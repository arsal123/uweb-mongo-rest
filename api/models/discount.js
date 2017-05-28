'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discountSchema = new Schema({
    discount_code: {
        type: String,
        required: 'Please enter discount code'
    },
    discount_type: {
        type: String
    },
    value: {
        type: Number,
        required: 'Please provide discount value'
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('discount', discountSchema);