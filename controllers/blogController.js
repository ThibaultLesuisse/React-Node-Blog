const isAuthenticated = require('../helpers/isAuthenticated');
const Post = require('../models/Post')

exports.blog = (req, res) => {
    isAuthenticated(req, res)?res.render('blog', {
        post: Post.find({})
    }):res.render('home');
}