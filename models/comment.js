const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
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