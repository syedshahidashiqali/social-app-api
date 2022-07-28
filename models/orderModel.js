const mongoose = require("mongoose");

const productOrderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        maxlength: 200
    },
    products:[
        {
            product: {
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

module.exports = mongoose.model("ProductOrder", productOrderSchema);