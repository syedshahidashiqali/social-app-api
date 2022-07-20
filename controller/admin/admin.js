
const User = require("../../models/user/user")

// delete user by id
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)

        await User.findByIdAndDelete(userId)
        return res.status(200).json({message: "User has been deleted", deletedUser: user})
    } catch(err) {
        res.status(500).json(err)
    }
}

// get all users
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find();
        return res.status(200).json(users)
        
        if(users.length === 0) {
            return res.status(404).json("There is not any user resgistered.")
        }
    } catch(err) {
        res.status(500).json(err)
    }
    
}

// update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).json("Acount has been updated!");
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {
    deleteUser,
    getAllUsers,
    updateUser
}