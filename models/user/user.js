const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
        unique: true
    },
    email: {
        type:String,
        required: true,
        maxlength: 50,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);