const bcrypt = require("bcrypt");

// user schema is
const User = require("../../models/user/user")

const registerUser = async (req, res) => {
    try {
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
        console.log("saved user")
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = registerUser;