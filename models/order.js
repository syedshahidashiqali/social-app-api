const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: Number,
    name: String,
    size: String,
    price: Number,
    quantity: Number,
   date: Date
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);