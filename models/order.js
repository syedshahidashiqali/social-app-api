const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    address: {
        type: String,
        required: true,
        maxlength: 200
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
}, {
    timestamps: true,

});

module.exports = mongoose.model("Order", orderSchema);