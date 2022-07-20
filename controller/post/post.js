const Post = require("../../models/post/post");
const User = require("../../models/user/user");
const Comment = require("../../models/comment/comment");

// Create post
const createPost = async (req, res) => {
    try {
        let { image, ...others } = req.body;
        image = req.files && req.files.file && req.files.file[0] && req.files.file[0].path;
        const newPost = await new Post({...others, image});
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(500).json(err);
    }
}

// Update post
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if(post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can only update your post")
        }
    } catch(err) {
        re.status(500).json(err);
    }
}

// Delete post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(post.userId = req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can only delete your post");
        }
    } catch(err) {
        res.status(500).json(err);
    }

}

// Like / Dislike post
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("The post has been liked")
        } 
        await post.updateOne({ $pull: { likes: req.body.userId } });
        return res.status(200).json("The post has been disliked");
    } catch(err) {
        res.status(500).json(err);
    }
}

// Comment post
const commentPost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        const newComment = await Comment.create({ userId: req.body.userId, content: req.body.content });
        // post.updateOne({ $push: { comments: { userId: req.body.userId, content: req.body.content} } });
        await post.comments.push(newComment)
        await post.save();
        await post.populate("comments")

        return res.status(201).json({ message: "The comment has been posted", post: post});
    } catch(err) {
        res.status(500).json(err);
    }
}

// Delete Comment
const deleteComment = async (req, res) => { 
    try {
        const comment = await Comment.findById(req.body.commentId);
        await comment.deleteOne();
        res.status(200).json({ message: "Comment deleted" });
    } catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    commentPost,
    deleteComment
}