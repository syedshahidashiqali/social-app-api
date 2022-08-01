const router = require("express").Router()

const { addReview } = require("../controller/reviewsController")

router.post("/add", addReview)

module.exports = router;