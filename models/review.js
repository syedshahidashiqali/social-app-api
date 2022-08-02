const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const reviewSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, { timestamps: true,toJSON : { virtuals : true},toObject : { virtuals : true} });


reviewSchema.virtual('user',{
    ref: "user",
    localField : 'userId',
    foreignField : '_id',
    justOne : true,
})

reviewSchema.virtual('Product',{
    ref: "Product",
    localField : 'productId',
    foreignField : '_id',
    justOne : true,
})

module.exports = mongoose.model("Review", reviewSchema)