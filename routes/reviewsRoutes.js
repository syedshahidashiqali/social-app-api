const router = require("express").Router()

const { addReview, getAllReviews, getAllReviewsOfProduct } = require("../controller/reviewsController")
const { verifyToken: auth } = require("../middleware/authMiddleware")
const { validationMiddleWare } = require("../middleware/validationMiddleware");
const { createReviewValRule } = require("../utils/validateRules")

router.post("/add", auth, validationMiddleWare(createReviewValRule), addReview)
router.get("/", auth, getAllReviews)
router.get("/product/:productId", auth, getAllReviewsOfProduct)

module.exports = router;