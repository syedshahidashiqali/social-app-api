const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")
const { generateEmail } = require("../config/email")

// user schema is
const User = require("../models/user")

// Register
const registerUser = async (req, res) => {
    // create session
    const session = await User.startSession();
    const opts = session;
    try {
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({email: req.body.email});
        session.startTransaction();
        if (oldUser) {
            await session.abortTransaction()
            session.endSession();
            return res.status(409).json(apiError("User Already Exist. Please Login"));
        }

        // create new user
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        })
        
        // save user and return response
        const user = await newUser.save(opts);

        await session.commitTransaction();
        session.endSession();        
        res.status(201).json(apiSuccessWithData("User is Created", user))
        const info = await generateEmail(req.body.email, `New User is created successfully`, `<h1>Welcome ${req.body.username}</h1> <h2>New user with username: ${req.body.username} and password: ${req.body.email} is created</h2>`)
        console.log(info)
    } catch (err) {
        await session.abortTransaction();
        session.endSession()
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
            const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.TOKEN_KEY, { expiresIn: '1h' })

            user.token = token;
            await user.save()

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