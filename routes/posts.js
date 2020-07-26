var express = require('express');
var router = express.Router();
var Post = require('./../model/postModel');
var User = require('./../model/userModel');
var bcrypt = require('bcrypt-nodejs');

/* GET user post */
router.get('/user-posts/:id', function(req, res, next) {
    var response = {};
    User.findById(req.params.id)
        .populate("posts")
        .exec(function(err, user) {
            if (err) {
                response = { success: false, message: err };
            } else {
                response = { success: true, message: user };
            }
            res.json(response);
        });
});


/* POST post */
router.post('/', function(req, res, next) {
    var response = {};
    var newpost = new Post(req.body);
    newpost.save(function(err, post) {
        if (err) {
            response = { success: false, message: err };
            res.json(response);
        } else {
            User.findOne({ _id: newpost.user_id }, function(err, user) {
                if (err) {
                    response = { success: false, message: err };
                    res.json(response);
                } else {
                    values = user.posts.push(post._id);
                    User.findByIdAndUpdate(
                        newpost.user_id,
                        user,
                        function(err, user) {
                            if (err) {
                                response = {
                                    success: false,
                                    message: err
                                };
                                res.json(response);
                            } else {
                                response = {
                                    success: true,
                                    message: 'Post added successfully'
                                };
                                res.json(response);
                            }
                        }
                    );
                }
            });
        };
    });
});

/* GET post by id */
router.get('/:id', function(req, res, next) {
    var response = {};
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            response = { success: false, message: err };
        } else {
            response = { success: true, message: post };
        };
        res.json(response);
    });
});


/* Put post */
router.put('/:id', function(req, res) {
    var response = {};
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if (err) {
            response = { success: false, message: err };
        } else {
            response = { success: true, message: 'Post update successfully.' };
        }
        res.json(response);
    });
});

/* Delete post */
router.delete('/:id', function(req, res) {
    var response = {};
    Post.remove({ _id: req.params.id }, function(err, post) {
        if (err) {
            response = { success: false, message: err };
        } else {
            response = { success: true, message: 'Post delete successfully.' };
        };
        res.json(response);
    });
});


module.exports = router;