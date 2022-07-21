
const User = require("../models/user")
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
        const users = await User.find();
        return res.status(200).json(apiSuccessWithData("All Users in database", users))
        
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
    updateUser
}