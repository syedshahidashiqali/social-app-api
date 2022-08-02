const router = require("express").Router();
const { createPost, updatePost, deletePost, likePost, commentPost, deleteComment, likesOfPost, commentsOfPost  } = require("../controllers/post")
const { verifyToken: auth } = require("../middleware/authMiddleware")


// Create Post
router.post("/createPost", auth, createPost)

// Update Post
router.post("/updatePost/:id", auth, updatePost)

// Delete Post
router.delete("/deletePost/:id", auth, deletePost)

// Like / Dislike Post
router.put("/:id/like", auth, likePost)

// Likes of all posts
router.get("/likes", auth, likesOfPost)

// Comment Post
router.post("/:id/comment", auth, commentPost)

// Comments of all post
router.get("/comments", auth, commentsOfPost)

// Comment Post
router.delete("/:id/comment/delete", auth, deleteComment)

module.exports = router;