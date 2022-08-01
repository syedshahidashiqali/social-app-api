const router = require("express").Router()

const { addReview, getAllReviews, getAllReviewsOfProduct, calculateAvgRating } = require("../controller/review")
const { verifyToken: auth } = require("../middleware/authMiddleware")
const { validationMiddleWare } = require("../middleware/validationMiddleware");
const { createReviewValRule } = require("../utils/validateRules")

router.post("/add", auth, validationMiddleWare(createReviewValRule), addReview)
router.get("/", auth, getAllReviews)
router.get("/product/:productId", auth, getAllReviewsOfProduct)
router.get("/averageRating", auth, calculateAvgRating)

module.exports = router;