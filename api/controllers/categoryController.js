'use strict'

var mongoose = require('mongoose'),
    Category = mongoose.model('category');

exports.list_all_category = function (req, res) {
    // console.log('req for Categorys coming')
    Category.find({}, function (err, Category) {
        if (err) res.send(err);
        res.json(Category);
    });
};

exports.read_a_category = function (req, res) {
    Category.findById(req.params.CategoryId, function (err, Category) {
        if (err) res.send(err);
        res.json(Category);
    })
};

exports.create_a_category = function (req, res) {
    var new_category = new Category(req.body);
    new_category.save(function (err, category) {
        if (err)
            res.send(err);
        res.json(category);
    });
};

exports.update_a_category = function (req, res) {
    
    Category.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }, function (err, Category) {
        if (err)
            res.send(err);
        res.json(Category);
    });
};

exports.delete_a_category = function (req, res) {
    
    Category.findByIdAndRemove(req.params.id, {}, function (err, Category) {
        if (err)
            res.send(err);
        res.json({ message: 'Category successfully deleted' });
    });
};