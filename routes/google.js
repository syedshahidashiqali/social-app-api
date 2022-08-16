const router = require("express").Router()
const { verifyAndDecodeToken } = require("../controllers/google")

router.post("/auth/google", verifyAndDecodeToken)

module.exports = router