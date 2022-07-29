const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/authController")
const { validationMiddleWare } = require("../middleware/validationMiddleware")
const { signupValRule, loginValRule } = require("../utils/validateRules")

// REGISTER
router.post("/register", validationMiddleWare(signupValRule), registerUser)

// LOGIN 
router.post("/login", validationMiddleWare(loginValRule), loginUser)

module.exports = router;