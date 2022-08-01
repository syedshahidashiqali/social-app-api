const router = require("express").Router()

const { addReview, getAllReviews, getAllReviewsOfProduct } = require("../controller/reviewsController")
const { verifyToken: auth } = require("../middleware/authMiddleware")

router.post("/add", auth, addReview)
router.get("/", auth, getAllReviews)
router.get("/product/:productId", auth, getAllReviewsOfProduct)

module.exports = router;