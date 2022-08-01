
const User = require("../models/userModel")
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")

// delete user by id
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json(apiSuccess("User has been deleted"))
    } catch(err) {
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
        
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
    
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(apiSuccessWithData("User", user))
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

// update user
const updateUser = async (req, res) => {
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(apiSuccess("Acount has been updated!"));
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

module.exports = {
    deleteUser,
    getAllUsers,
    updateUser,
    getUser
}