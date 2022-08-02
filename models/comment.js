const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const commentSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        maxlength: 500,
    }
},{ 
    timestamps: true 
});

module.exports = mongoose.model("Comment", commentSchema);