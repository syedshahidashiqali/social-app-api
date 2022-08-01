const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
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
}, { timestamps: true });

module.exports = mongoose.model("Reviews", reviewsSchema)