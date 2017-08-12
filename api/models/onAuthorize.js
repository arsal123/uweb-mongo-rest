'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onAuthorizeSchema = new Schema(
    {
        create_time: {
            type: Date,
            default: Date.now
        },
        paymentToken: {
            type: String
        },
        payerID: {
            type: String
        },
        paymentID: {
            type: String
        },
        intent: {
            type: String
        },
        returnUrl: String

    }, { strict: false });

module.exports = mongoose.model('on_authorize', onAuthorizeSchema);