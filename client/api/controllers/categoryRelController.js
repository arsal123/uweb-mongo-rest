'use strict'

var mongoose = require('mongoose'),
    CategoryRel = mongoose.model('category_rel');

exports.list_all_category_rel = function (req, res) {
    // console.log('req for CategoryRels coming')
    CategoryRel.find({}, function (err, CategoryRel) {
        if (err) res.send(err);
        res.json(CategoryRel);
    });
};

exports.read_a_category_rel = function (req, res) {
    CategoryRel.findById(req.params.CategoryRelId, function (err, CategoryRel) {
        if (err) res.send(err);
        res.json(CategoryRel);
    })
};

exports.create_a_category_rel = function (req, res) {
    var new_category = new CategoryRel(req.body);
    new_category.save(function (err, category) {
        if (err)
            res.send(err);
        res.json(category);
    });
};

exports.update_a_category_rel = function (req, res) {
    CategoryRel.findOneAndUpdate(req.params.CategoryRelId, req.body, { new: true }, function (err, CategoryRel) {
        if (err)
            res.send(err);
        res.json(CategoryRel);
    });
};

exports.delete_a_category_rel = function (req, res) {
    CategoryRel.remove({
        _id: req.params.CategoryRelId
    }, function (err, CategoryRel) {
        if (err)
            res.send(err);
        res.json({ message: 'CategoryRel successfully deleted' });
    });
};