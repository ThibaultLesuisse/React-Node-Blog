const Post = require('../models/Post')


exports.blog = (req, res) => {
    Post.find({}).then((result) => {
        res.render('blog/blog', {
            posts: result
        })
    });
    

}
exports.new = (req, res) => {
    res.render('blog/new')
}
exports.newSubmit = (req, res) => {
    console.log('Got into newSubmit')
    if(req.body.title && req.body.content){
        let new_post = new Post({
            title: req.body.title,
            author: "Thibault",
            content: req.body.content
        });
        new_post.save().then(() => {
        });
        res.redirect('../blog');
    }
}