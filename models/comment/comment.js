const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
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