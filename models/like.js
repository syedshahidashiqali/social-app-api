const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
},{ 
    timestamps: true 
});

module.exports = mongoose.model("Like", likeSchema);