'use strict';

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
    });
};

exports.create_a_item = function (req, res) {
    var new_item = new Item(req.body);
    new_item.save(function (err, category) {
        if (err)
            res.send(err);
        res.json(category);
    });
};

exports.upload_a_img = function(req, res) {
    // req.file is the contain the files
    // req.body will hold the text fields, if there were any
    // console.log(req.files);
    if (req.files) {
        res.send('Successfully uploaded');
    } else {
        // throw an error
    }

};

exports.update_a_item = function (req, res) {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }, function (err, Item) {
        if (err)
            res.send(err);
        res.json(Item);
    });
};

exports.delete_a_item = function (req, res) {
    
   Item.findByIdAndRemove(req.params.id, {}, function (err, Item) {
        if (err)
            res.send(err);
        res.json({ message: 'Item successfully deleted' });
    });
};
