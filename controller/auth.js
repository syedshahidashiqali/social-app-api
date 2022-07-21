const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")

// user schema is
const User = require("../models/user")

// Register
const registerUser = async (req, res) => {
    try {
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({email: req.body.email});

        if (oldUser) {
            return res.status(409).json(apiError("User Already Exist. Please Login"));
        }

        // create new user
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin,
        })
        
        // save user and return response
        const user = await newUser.save();
        res.status(201).json(apiSuccessWithData("User is Created", user))
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json(apiError("User is not registered"))
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(400).json(apiError("wrong password!"))
        }

        if(user && validPassword) {
            const token = jwt.sign(user.email, process.env.TOKEN_KEY, { expiresIn: '1h' })

            user.token = token;

            return res.status(200).json(apiSuccessWithData("User token has been generated", token))
        }

    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

module.exports = {
    registerUser,
    loginUser,
}