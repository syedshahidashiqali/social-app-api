const router = require("express").Router();
const registerUser = require("../../controller/auth/user")

// REGISTER
router.post("/register", registerUser)

module.exports = router;