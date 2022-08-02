const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const likeSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
},{ 
    timestamps: true 
});

module.exports = mongoose.model("Like", likeSchema);