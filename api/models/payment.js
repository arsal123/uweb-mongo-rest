'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema(
    {
    id: {
        type: String,
        required: 'it should have an id'
    },
    intent: {
        type: String
    },
    state: {
        type: String    
    },
    cart: {
        type: String 
    },
    create_time: {
        type: Date
    },
    payer : {
        payment_method: { type: String },
        status: { type: String },
        payer_info: {
            email: { type: String },
            first_name: { type: String },
            middle_name: { type: String },
            last_name: { type: String },
            payer_id: { type: String },
            country_code: { type: String },
            shipping_address: {
                recipient_name: { type: String },
                line1: { type: String },
                city: { type: String },
                state: { type: String },
                postal_code: { type: String },
                country_code: { type: String } 
            } 
        }
    },
    transactions: [
        {
            amount: {
                total: String,
                currency: String,
            },
            related_resources: [
                {
                    sale: {
                        id: String,
                        state: String,
                        payment_mode: String,
                        protection_eligibility: String,
                        parent_payment: String,
                        amount: {
                            total: String,
                            currency: String
                        }
                    }
                }
            ]
        }
    ]
}, {strict: false});

module.exports = mongoose.model('payment', paymentSchema);