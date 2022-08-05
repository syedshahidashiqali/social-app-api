
const User = require("../models/user")
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json(apiError("Admin is not registered"))
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            res.status(400).json(apiError("wrong password!"))
        }

        if (user.role !== "admin") {
            res.status(400).json(apiError("You are not an admin"))
        }

        if (user && validPassword && user.role === "admin") {
            const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.TOKEN_KEY)
            user.token = token;
            await user.save()

            res.status(200).json(apiSuccessWithData("Admin token has been generated", token))
        }
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

// delete user by id
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json(apiSuccess("User has been deleted"))
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

// get all users
const getAllUsers = async (req, res) => {
    try {
        const customLabels = { docs: "docs" }

        const users = await User.paginate(
            {},
            {
                page: req.query.page,
                limit: req.query.limit,
                lean: true,
                customLabels: customLabels
            }
        )
        return res.status(200).json(apiSuccessWithData("All Users in database", users))

    } catch (err) {
        res.status(500).json(apiError(err.message))
    }

}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(apiSuccessWithData("User", user))
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

// update user
const updateUser = async (req, res) => {
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(apiSuccess("Acount has been updated!"));
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

module.exports = {
    adminLogin,
    deleteUser,
    getAllUsers,
    updateUser,
    getUser
}