'use strict'

var mongoose = require('mongoose'),
    ContactUs = mongoose.model('contact_us');

exports.list_all_contact_us = function (req, res) {
    // console.log('req for ContactUss coming')
    ContactUs.find({}, function (err, BaseCategory) {
        if (err) res.send(err);
        res.json(ContactUs);
    });
};

exports.read_a_contact_us = function (req, res) {
    ContactUs.findById(req.params.BaseCategoryId, function (err, BaseCategory) {
        if (err) res.send(err);
        res.json(ContactUs);
    })
};

exports.create_a_contact_us = function (req, res) {
    var new_category = new ContactUs(req.body);
    new_category.save(function (err, category) {
        if (err)
            res.send(err);
        res.json(category);
    });
};

exports.update_a_contact_us = function (req, res) {
    ContactUs.findOneAndUpdate(req.params.BaseCategoryId, req.body, { new: true }, function (err, BaseCategory) {
        if (err)
            res.send(err);
        res.json(ContactUs);
    });
};

exports.delete_a_contact_us = function (req, res) {
    ContactUs.remove({
        _id: req.params.ContactUsId
    }, function (err, ContactUs) {
        if (err)
            res.send(err);
        res.json({ message: 'ContactUs successfully deleted' });
    });
};
