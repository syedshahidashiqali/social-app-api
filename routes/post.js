const router = require("express").Router();
const { getPost, getAllPosts, createPost, updatePost, deletePost, likePost, commentPost, deleteComment, likesOfPost, commentsOfPost  } = require("../controllers/post")
const { verifyToken: auth } = require("../middleware/authMiddleware")

// Get post
router.get("/:id", getPost);

// Get post
router.get("/", auth, getAllPosts);

// Create Post
router.post("/createPost", auth, createPost)

// Update Post
router.post("/updatePost/:id", auth, updatePost)

// Delete Post
router.delete("/deletePost/:id", auth, deletePost)

// Like / Dislike Post
router.put("/:id/like", likePost)

// Likes of all posts
router.get("/likes/all", likesOfPost)

// Comment Post
router.post("/:id/comment", auth, commentPost)

// Comments of all post
router.get("/comments/all", auth, commentsOfPost)

// Comment Post
router.delete("/:id/comment/delete", auth, deleteComment)

module.exports = router;