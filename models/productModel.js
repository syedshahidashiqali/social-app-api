const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    description: {
        type: String,
        maxlength: 40,
        default: ""
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema)