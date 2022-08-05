const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = require("mongoose");

const userSchema = new Schema({
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
    role: {
        type: String,
        default: "basic"
    },
    token: {
        type: String,
        default: ""
    },
    otp: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

userSchema.plugin(mongoosePaginate);
userSchema.index({ "$**": "text" });

const User = mongoose.model("user", userSchema);

module.exports = User;