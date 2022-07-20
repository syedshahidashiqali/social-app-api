const router = require("express").Router();
const { registerUser,loginUser } = require("../controller/auth")
const { createPost, updatePost, deletePost, likePost, commentPost, deleteComment } = require("../controller/post")

// REGISTER
router.post("/register", registerUser)

// LOGIN 
router.post("/login", loginUser)

// Create Post
router.post("/createPost", createPost)

// Update Post
router.post("/updatePost/:id", updatePost)

// Delete Post
router.delete("/deletePost/:id", deletePost)

// Like / Dislike Post
router.put("/:id/like", likePost)

// Comment Post
router.post("/:id/comment", commentPost)

// Comment Post
router.delete("/:id/comment/delete", deleteComment)

module.exports = router;