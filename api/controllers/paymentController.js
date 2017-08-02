'use strict';

var mongoose = require('mongoose'),
    Payment = mongoose.model('payment'),
    logPrefix = 'PaymentController: ';

// exports.list_all_final = function (req, res) {
//     // console.log('req for BaseCategorys coming')
//     Payment.find({}, function (err, Payment) {
//         if (err) res.send(err);
//         res.json(Payment);
//     });
// };

// exports.read_a_final = function (req, res) {
//     Payment.findById(req.params.FinalId, function (err, Payment) {
//         if (err) res.send(err);
//         res.json(Payment);
//     });
// };

exports.create_a_thing = function (req, res) {
    console.log(logPrefix + JSON.stringify(req.body));
    var new_payment = new Payment(req.body);
    new_payment.save(function (err, payment) {
        if (err)
            res.send(err);
        res.json(payment._id);
    });
};
