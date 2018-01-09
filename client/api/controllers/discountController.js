'use strict'

var mongoose = require('mongoose'),
    Discount = mongoose.model('discount');

exports.list_all_discount = function (req, res) {
    // console.log('req for Discounts coming')
    Discount.find({}, function (err, Discount) {
        if (err) res.send(err);
        res.json(Discount);
    });
};

exports.read_a_discount = function (req, res) {
    Discount.findById(req.params.DiscountId, function (err, Discount) {
        if (err) res.send(err);
        res.json(Discount);
    })
};

exports.create_a_discount = function (req, res) {
    var new_category = new Discount(req.body);
    new_category.save(function (err, category) {
        if (err)
            res.send(err);
        res.json(category);
    });
};

exports.update_a_discount = function (req, res) {
    Discount.findOneAndUpdate(req.params.DiscountId, req.body, { new: true }, function (err, Discount) {
        if (err)
            res.send(err);
        res.json(Discount);
    });
};

exports.delete_a_discount = function (req, res) {
    Discount.remove({
        _id: req.params.DiscountId
    }, function (err, Discount) {
        if (err)
            res.send(err);
        res.json({ message: 'Discount successfully deleted' });
    });
};