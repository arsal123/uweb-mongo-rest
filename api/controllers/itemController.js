'use strict'

var mongoose = require('mongoose'),
    Item = mongoose.model('item');

exports.list_all_item = function (req, res) {
    // console.log('req for Items coming')
    Item.find({}, function (err, Item) {
        if (err) res.send(err);
        res.json(Item);
    });
};

exports.read_a_item = function (req, res) {
    Item.findById(req.params.ItemId, function (err, Item) {
        if (err) res.send(err);
        res.json(Item);
    })
};

exports.create_a_item = function (req, res) {
    var new_category = new Item(req.body);
    new_category.save(function (err, category) {
        if (err)
            res.send(err);
        res.json(category);
    });
};

exports.update_a_item = function (req, res) {
    Item.findOneAndUpdate(req.params.ItemId, req.body, { new: true }, function (err, Item) {
        if (err)
            res.send(err);
        res.json(Item);
    });
};

exports.delete_a_item = function (req, res) {
    Item.remove({
        _id: req.params.ItemId
    }, function (err, Item) {
        if (err)
            res.send(err);
        res.json({ message: 'Item successfully deleted' });
    });
};