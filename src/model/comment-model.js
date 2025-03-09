const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    parentComment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;