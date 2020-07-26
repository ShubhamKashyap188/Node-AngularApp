var express = require('express');
var router = express.Router();
var User = require('./../model/userModel');
var bcrypt = require('bcrypt-nodejs');

/* GET user */
router.get('/', function(req, res, next) {
    var response = {};
    User.find({}).populate("posts").exec(function(err, user) {
        if (err) {
            response = { success: true, message: err };
        } else {
            response = { success: false, message: user };
        };
        res.json(response);
    });
});

/* GET user by id */
router.get('/:id', function(req, res, next) {
    var response = {};
    User.findById(req.params.id).populate("posts").exec(function(err, user) {
        if (err) {
            response = { success: true, message: err };
        } else {
            response = { success: false, message: user };
        };
        res.json(response);
    });
});


/* Put user */
router.put('/:id', function(req, res) {
    var response = {};
    User.findByIdAndUpdate(req.params.id, values, function(err, user) {
        if (err) {
            response = { error: true, message: err };
        } else {
            response = { error: false, message: user };
        }
        res.json(response);
    });


});

/* Delete user */
router.delete('/:id', function(req, res) {
    var response = {};
    User.remove({ _id: req.params.id }, function(err, user) {
        if (err) {
            response = { error: true, message: err };
        } else {
            response = { error: false, message: 'user deleted successfully.' };
        };
        res.json(response);
    });
});


module.exports = router;