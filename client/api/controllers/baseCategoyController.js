'use strict';

var mongoose = require('mongoose'),
    BaseCategory = mongoose.model('base_category');

exports.list_all_base_category = function (req, res) {
    // console.log('req for BaseCategorys coming')
    BaseCategory.find({}, function (err, BaseCategory) {
        if (err) res.send(err);
        res.json(BaseCategory);
    });
};

exports.read_a_base_category = function (req, res) {
    BaseCategory.findById(req.params.BaseCategoryId, function (err, BaseCategory) {
        if (err) res.send(err);
        res.json(BaseCategory);
    });
};

exports.create_a_base_category = function (req, res) {
    var new_category = new BaseCategory(req.body);
    new_category.save(function (err, category) {
        if (err)
            res.send(err);
        res.json(category);
    });
};

exports.update_a_base_category = function (req, res) {
    BaseCategory.findOneAndUpdate(req.params.BaseCategoryId, req.body, { new: true }, function (err, BaseCategory) {
        if (err)
            res.send(err);
        res.json(BaseCategory);
    });
};

exports.delete_a_base_category = function (req, res) {
    BaseCategory.findByIdAndRemove(req.params.id, {}, function (err, Category) {
        if (err){
            console.error('Error deleting base category: ' + JSON.stringify(err));
            res.send(err);
        }
        res.json({ message: 'BaseCategory successfully deleted' });
    });
};