const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth');
const commentController = require('../controller/comment-controller');

router.post('/api/comment/create-comment', auth, commentController.createComment);

router.get('/api/comment/get-comments/:postId', commentController.getAllComments);

router.patch('/api/comment/update-comment/:commentId', auth, commentController.updateComment);

router.delete('/api/comment/delete-comment/:commentId', auth, commentController.deleteComment);

module.exports = router;