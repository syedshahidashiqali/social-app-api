const router = require("express").Router()

const { addReview, getAllReviews, getAllReviewsOfProduct, calculateAvgRatingOfAllProducts, calculateAvgRatingOfSingleProduct } = require("../controllers/review")
const { verifyToken: auth } = require("../middleware/authMiddleware")
const { validationMiddleWare } = require("../middleware/validationMiddleware");
const { createReviewValRule } = require("../utils/validateRules")

router.post("/add", auth, validationMiddleWare(createReviewValRule), addReview)
router.get("/", auth, getAllReviews)
router.get("/product/:productId", auth, getAllReviewsOfProduct)

// << AGGREGATION Routes>>
router.get("/averageRating/all", auth, calculateAvgRatingOfAllProducts)
router.get("/averageRating/single/:productId", auth, calculateAvgRatingOfSingleProduct)

module.exports = router;