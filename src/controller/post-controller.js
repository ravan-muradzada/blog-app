const Post = require('../model/post-model');
const { deleteImages } = require('../utils/post-related-functions');

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const postPhotosPaths = req.files.map(f => f.path);

        const post = new Post({ title, content, images: postPhotosPaths });

        await post.save();

        const user = req.user;

        user.posts.push(post);

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Post created successfully!',
            post
        });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }    
}

exports.readPosts = async (req, res) => { 
    try {   
        const page = req.query.page || 1;
        let limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        limit = Math.min(limit, 50); // min count for fetching

        const posts = await Post.find({})
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            currentPage: page,
            posts
        });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
}

exports.deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user;

        // Check whether the user has the post with given id
        const isValid = user.posts.some(postId => postId.toString() === id);

        if (!isValid) {
            return res.status(404).json({
                success: false,
                error: 'You do not have the post with this id.'
            });
        }

        // Remove the post from the Post model
        const post = await Post.findByIdAndDelete(id);

        // Remove the id of the post from user model
        user.posts = user.posts.filter(postId => postId.toString() !== id); 
        
        await user.save();

        // Delete file from the local folder
        deleteImages(post);

        res.status(200).json({
            success: true,
            message: 'The post deleted successfully!',
            deletedPost: post
        });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
}

exports.updatePost = async (req, res) => {
    try {
        const user = req.user, id = req.params.id;

        const isValid = user.posts.some(postId => postId.toString() === id);
        
        if (!isValid) {
            return res.status(404).json({
                success: false,
                message: 'Post not found!'
            })
        };

        const post = await Post.findById(id);

        const { title, content } = req.body;
        const images = req.files;
        if (title) post.title = title;
        if (content) post.content = content;

        if (images) {
            
            // Delete previous images
            console.log(deleteImages(post));
            // Replace with new ones
            post.images = images.map(i => i.path);
        }
   
        await post.save();

        res.status(200).json({
            success: true,
            updatedPost: post
        });
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
}