const Comment = require('../model/comment-model');
const Post = require('../model/post-model');

exports.createComment = async (req, res) => {
    try {
        const { user, post, text, parentComment } = req.body;

        if (!user || !post || !text) {
            return res.status(400).json({
                success: false,
                error: 'User, post and text required!'
            });
        }

        if (parentComment) {
            const parentExist = await Comment.findById(parentComment);

            if (!parentExist) {
                return res.status(404).json({
                    success: false,
                    error: 'Parent not found!'
                });
            }
        }

        const comment = new Comment({ user, post, text, parentComment });
        await comment.save();

        res.status(201).json({
            success: true,
            message: comment
        });
    } catch(e) {
        res.status(400).json({
            success: false,
            error: e.message
        })
    }
} 

exports.getAllComments = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (!postId) {
            return res.status(400).json({
                success: false,
                error: 'Post ID is required!'
            });
        }

        const postExist = await Post.findById(postId);

        if (!postExist) {
            return res.status(404).json({
                success: false,
                error: 'Post not found!'
            });
        }

        const page = Math.max(1, req.query.page) || 1;
        let limit = Math.max(1, req.query.limit) || 10;
        const skip = (page - 1) * limit;

        limit = Math.min(limit, 50);

        const comments = await Comment.find({ post: postId })
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            comments
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            error: e.message
        })
    }
}

exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Text required!'
            });
        }

        if (!commentId) {
            return res.status(400).json({
                success: false,
                error: 'ID is required to update the comment'
            });
        }

        const comment = await Comment.findOne({ _id: commentId, user: req.user._id });

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found!'
            });
        }

        comment.text = text;
        comment.updatedAt = new Date();
        await comment.save();


        res.status(200).json({
            success: true,
            message: 'Updated successfully'
        });
    } catch(e) {
        res.status(400).json({
            success: false,
            error: e.message
        });
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        if (!commentId) {
            return res.status(404).json({
                success: false,
                error: 'Comment ID required!'
            });
        }

        const comment = await Comment.findOne({ _id: commentId, user: req.user._id });

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found!'
            });
        }

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Deleted successfully',
            comment
        });
    } catch(e) {
        res.status(400).json({
            success: false,
            error: e.message
        });
    }
}