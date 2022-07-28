const router = require("express").Router();
const { registerUser,loginUser } = require("../controller/auth")
const { createPost, updatePost, deletePost, likePost, commentPost, deleteComment, likesOfPost, commentsOfPost  } = require("../controller/post")
const { verifyToken: auth } = require("../middleware/auth")
const { signup } = require("../middleware/validationMiddleware")

// REGISTER
router.post(
    "/register",
    signup,
    registerUser
)

// LOGIN 
router.post("/login", loginUser)

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