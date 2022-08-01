const Product = require("../models/productModel")
const { apiSuccessWithData, apiSuccess, apiError } = require("../utils/apiHelpers")

// Add Product
const addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            avgRating: req.body.avgRating
        })

        await newProduct.save()
        res.status(201).json(apiSuccess("New Product is Added"))
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

// Get all Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(apiSuccessWithData("All products available", products))
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

module.exports = {
    addProduct,
    getAllProducts
}