var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('./../model/userModel');
var Post = require('./../model/postModel');
var secret = require('./../config/database');
var bcrypt = require('bcrypt-nodejs');

/* signup */
router.post('/signup', function(req, res) {
    var response = {};
    req.body.password = bcrypt.hashSync(req.body.password);
    let newUser = new User(req.body);
    newUser.save(function(err, user) {
        console.log(user);
        if (err) {
            response = { success: false, message: err };
        } else {
            response = { success: true, message: 'User sign up successfully.' };
        }
        res.json(response);
    });
});

/* login */
router.post('/login', function(req, res, next) {
    let response = {};
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            response = { success: false, message: err };
        } else if (user == null) {
            response = { success: false, message: 'Email is not exist.' };
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.sign({ data: user }, secret.key, { expiresIn: 3600 });
                response = { success: true, message: user, token: token };
            } else {
                response = { success: false, message: 'Invalid Email/Password' };
            }
        }

        return res.json(response);
    });
});

/* GET post */
router.get('/all-posts', function(req, res, next) {
    var response = {};
    Post.find({ status: true }, null, { sort: { 'created_at': -1 } }, function(err, post) {
        if (err) {
            response = { success: false, message: err };
        } else {
            response = { success: true, message: post };
        };
        res.json(response);
    });
});

module.exports = router;