const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:" user",
        required: true,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    image: {
        type: String,
    },
    comments: {
        type: Number,
        default: 0
    }
},{ 
    timestamps: true,
    toJSON : { virtuals : true },
    toObject : { virtuals : true }
});

postSchema.virtual('numberOfLikes',{
    ref: "Like",
    localField : '_id',
    foreignField : 'postId',
    justOne : true,
    count: true
})

module.exports = mongoose.model("Post", postSchema);