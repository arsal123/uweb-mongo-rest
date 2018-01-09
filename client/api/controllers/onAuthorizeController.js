'use strict';

var mongoose = require('mongoose'),
    Authorize = mongoose.model('on_authorize'),
    logPrefix = 'onAuthorizeController: ';

exports.create_authorize = function (req, res) {

    console.log(logPrefix + 'Inside onAuthorize controller save');

    console.log(logPrefix + JSON.stringify(req.body));
    var new_authorize = new Authorize(req.body);
    new_authorize.save(function (err, authorize) {
        if (err)
            res.send(err);
        
        console.log(logPrefix + 'Authorize successfully saved: ' + authorize._id);
        res.json(authorize._id);
    });
};
