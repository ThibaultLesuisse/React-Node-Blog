const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String
}, { timestamps: true})
postSchema.static('findAll', function(callback){
    return this.find({}, callback);
})
const Post = mongoose.model('Post', postSchema);

module.exports = Post;