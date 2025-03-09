const express = require('express');
const router = new express.Router();

const postController = require('../controller/post-controller');
const postUpload = require('../utils/post-multer');
const auth = require('../middleware/auth');

router.post('/api/post/create-post', postUpload.array('images', 10), auth, postController.createPost);

router.get('/api/post/read-posts', postController.readPosts);

router.patch('/api/post/update-post/:id', postUpload.array('images', 10), auth, postController.updatePost);

router.delete('/api/post/delete-post/:id', auth, postController.deletePost);


module.exports = router;