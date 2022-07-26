const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Like = require("../models/like");
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")

// Get post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate(["numberOfLikes", "numberOfComments"])
        res.status(200).json(apiSuccessWithData("Post Data", post));
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate(["numberOfLikes", "numberOfComments"]).exec()
        res.status(200).json(apiSuccessWithData("All posts in the databse", posts));
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }
}

// Create post
const createPost = async (req, res) => {
    try {
        let { image, ...others } = req.body;
        image = req.files && req.files.file && req.files.file[0] && req.files.file[0].filename;
        const newPost = await new Post({...others, image});
        const savedPost = await newPost.save();
        res.status(200).json(apiSuccessWithData("The post has been saved", savedPost));
    } catch(err) {
        res.status(500).json(apiError(err));
    }
}

// Update post
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if(post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json(apiSuccess("The post has been updated"));
        } else {
            res.status(403).json(apiError("You can only update your post"))
        }
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }
}

// Delete post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(post.userId = req.body.userId) {
            await post.deleteOne();
            res.status(200).json(apiSuccess("The post has been deleted"));
        } else {
            res.status(403).json(apiError("You can only delete your post"));
        }
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }

}

// Like / Dislike post
const likePost = async (req, res) => {
    try {
        const like = await Like.findOne({ userId: req.body.userId, postId: req.params.id })
        if(!like) {
            const newLike = await Like.create({ userId: req.body.userId, postId: req.params.id });
            await newLike.save();
            res.status(201).json(apiSuccess("The post has been liked"));
        } else {
            await Like.findOneAndDelete({ userId: req.body.userId, postId: req.params.id })
            res.status(200).json(apiSuccess("The post has been disliked"));
        }
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }
}

// Likes of the post
const likesOfPost = async (req, res) => {
    try{
        const likes = await Like.find();
        res.status(200).json(apiSuccessWithData("All likes of all posts", likes));
    }catch(err){
        res.status(500).json(apiError(err.message))
    }

};

// Comment post
const commentPost = async (req, res) => {
    try {
        const newComment = await Comment.create({ 
            userId: req.body.userId, 
            postId: req.params.id, 
            content: req.body.content 
        });
        await newComment.save();
        res.status(201).json(apiSuccess("The comment has been posted"));
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }
}

const commentsOfPost = async (req, res) => {
    try{
        const comments = await Comment.find();
        res.status(200).json(apiSuccessWithData("All comments of all posts", comments));
    }catch(err){
        res.status(500).json(apiError(err.message))
    }
};

// Delete Comment
const deleteComment = async (req, res) => { 
    try {
        const comment = await Comment.findByIdAndDelete(req.body.commentId);
        res.status(200).json(apiSuccess("Comment deleted"));
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }
}

module.exports = {
    getPost,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    likesOfPost,
    commentPost,
    commentsOfPost,
    deleteComment,
}