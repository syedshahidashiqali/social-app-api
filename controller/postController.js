const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/comment");
const Like = require("../models/like");
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")

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
        let post = await Post.findById(req.params.id);
        const like = await Like.findOne({ userId: req.body.userId, postId: req.params.id })
        if(!like) {
            const newLike = await Like.create({ userId: req.body.userId, postId: req.params.id });
            await newLike.save();
            const likes = await Like.find();
            post.likes = likes.length;
            await post.save();
            return res.status(201).json(apiSuccessWithData("The post has been liked", post));
        } else {
            const delLike = await Like.findOneAndDelete({ userId: req.body.userId, postId: req.params.id })
            const likes = await Like.find();
            post.likes = likes.length;
            return res.status(200).json(apiSuccess("The post has been disliked"));
        }

        // if(!post.likes.includes(req.body.userId)) {
        //     await post.updateOne({ $push: { likes: req.body.userId } });
        //     return res.status(200).json(apiSuccess("The post has been liked"))
        // } 
        // await post.updateOne({ $pull: { likes: req.body.userId } });
        // return res.status(200).json(apiSuccess("The post has been disliked"));
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
        let post = await Post.findById(req.params.id);
        const newComment = await Comment.create({ 
            userId: req.body.userId, 
            postId: req.params.id, 
            content: req.body.content 
        });
        await newComment.save();
        const comments = await Comment.find();
        post.comments = comments.length;
        await post.save();
        return res.status(201).json(apiSuccess("The comment has been posted"));
        
        // const post = await Post.findById(req.params.id);
        // const newComment = await Comment.create({ userId: req.body.userId, content: req.body.content });
        // // post.updateOne({ $push: { comments: { userId: req.body.userId, content: req.body.content} } });
        // await post.comments.push(newComment)
        // await post.save();
        // await post.populate("comments")
        // return res.status(201).json(apiSuccessWithData("The comment has been posted", post));
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
    createPost,
    updatePost,
    deletePost,
    likePost,
    likesOfPost,
    commentPost,
    commentsOfPost,
    deleteComment,
}