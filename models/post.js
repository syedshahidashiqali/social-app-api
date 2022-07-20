const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    image: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Comment"
    }
},{ 
    timestamps: true 
});

module.exports = mongoose.model("Post", postSchema);