const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true,
    },
    address: {
        type: String,
        required: true,
        maxlength: 200
    },
    products:[
        {
            productId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);