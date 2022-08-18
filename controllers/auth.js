const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")
const { generateEmail } = require("../config/email")
const { OAuth2Client } = require("google-auth-library")
// user schema is
const User = require("../models/user")
const client = new OAuth2Client("74131798307-mil5equd3kte3s5vu61i8c10grl8eg44.apps.googleusercontent.com")
// Register
const registerUser = async (req, res) => {
    // create session
    const session = await User.startSession();
    const opts = session;
    try {
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email: req.body.email });
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
        if (!user) {
            return res.status(400).json(apiError("User is not registered"))
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json(apiError("wrong password!"))
        }

        if (user && validPassword) {
            const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.TOKEN_KEY)
            user.token = token;
            await user.save()

            res.status(200).json(apiSuccessWithData("User token has been generated", token))
            generateEmail(email, `User is logged in.`, `<h1>Welcome ${req.body.email}</h1>`)
        }
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}


const loginWithGoogle = async (req, res) => {
    try {
        const { token } = req.body;
        const { payload } = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        console.log("payload is:", payload)
        const { email_verified, name, email, } = payload

        if (email_verified) {
            const user = await User.findOne({ email: email });
            if (user) {
                const jwtToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.TOKEN_KEY)
                user.token = jwtToken;
                await user.save()
                return res.status(200).json(apiSuccessWithData("User token", { token: jwtToken }))
            }
            else {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash("12345678", salt)
                const newUser = await User.create({ username: name, email: email, password: hashedPassword, role: "admin" })
                const jwtToken = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.TOKEN_KEY)
                newUser.token = jwtToken;
                await newUser.save()
                return res.status(200).json(apiSuccessWithData("User token", { token: jwtToken }))
            }

        }
        // res.status(200).json(apiSuccessWithData("Data is", { username: name, email: email, verified_email: email_verified }))
        // res.status(200).json(apiSuccess("Data is"))
    } catch (err) {
        console.log(err.message)
        res.status(500).json(apiError(err.message))
    }
}

module.exports = {
    registerUser,
    loginUser,
    loginWithGoogle
}