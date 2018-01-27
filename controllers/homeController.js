const mongoose = require('mongoose');
const Post = require('../models/Post');

exports.Home = (req, res) => {
    Post.findAll((err, posts) => {
        res.render('home', {
            posts: posts
        });
    })
    
};
exports.Register = (req, res) => {
    res.render('register');
}