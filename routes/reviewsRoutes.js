const router = require("express").Router()

const { addReview, getAllReviews, getAllReviewsOfProduct } = require("../controller/reviewsController")

router.post("/add", addReview)
router.get("/", getAllReviews)
router.get("/product/:productId", getAllReviewsOfProduct)

module.exports = router;