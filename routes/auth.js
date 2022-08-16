const router = require("express").Router();
const { registerUser, loginUser, loginWithGoogle } = require("../controllers/auth")
const { validationMiddleWare } = require("../middleware/validationMiddleware")
const { signupValRule, loginValRule } = require("../utils/validateRules")

// REGISTER
router.post("/register", validationMiddleWare(signupValRule), registerUser)

// LOGIN 
router.post("/login", validationMiddleWare(loginValRule), loginUser)
router.post("/googleLogin", loginWithGoogle)

module.exports = router;