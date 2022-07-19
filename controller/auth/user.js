const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user schema is
const User = require("../../models/user/user")

const registerUser = async (req, res) => {
    try {
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({email: req.body.email});

        if (oldUser) {
            return res.status(409).json("User Already Exist. Please Login");
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

        // create token
        const token = jwt.sign(req.body.email, process.env.TOKEN_KEY)

        newUser.token = token;
        
        // save user and return response
        const user = await newUser.save();
        console.log("saved user")
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = registerUser;