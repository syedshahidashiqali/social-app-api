const mongoose = require("mongoose")
const Review = require("../models/review")
const { apiError, apiSuccess, apiSuccessWithData } = require("../utils/apiHelpers")

const addReview = async (req, res) => {
    try {
        const newReview = await Review.create({
            userId: req.body.userId,
            productId: req.body.productId,
            detail: req.body.detail,
            rating: req.body.rating
        })

        await newReview.save()

        res.status(201).json(apiSuccess("Your review has been posted."))

    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate([
                { path: "user", select: "-__v -createdAt -updatedAt -password -_id" },
                { path: "Product", select: "-__v -createdAt -updatedAt -password -_id" }
            ])
            .select("-__v -createdAt -updatedAt")
            .exec();

        res.status(200).json(apiSuccessWithData("All Reviews for all products", reviews))

    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

const getAllReviewsOfProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId }).populate(["user"])
        res.status(200).json(apiSuccessWithData("Reviews of a single product", reviews))

    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

// << AGGREGATION >>

const calculateAvgRatingOfAllProducts = async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: "$productId",
                    averageRatingOfProducts: { "$avg": "$rating" }
                }
            }
        ]

        const result = await Review.aggregate(pipeline)
        res.status(200).json(apiSuccessWithData("The average rating of all products", result))

    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

const calculateAvgRatingOfSingleProduct = async (req, res) => {

    try {
        const id = req.params.productId

        const pipeline = [
            {
                $match: {
                    productId: mongoose.Types.ObjectId(id)
                }
            },
            {
                $group: {
                    _id: "$productId",
                    averageRatingOfProducts: { "$avg": "$rating" }
                }
            }
        ]

        const result = await Review.aggregate(pipeline)
        res.status(200).json(apiSuccessWithData("The average rating of a single product", result))

    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}


module.exports = {
    addReview,
    getAllReviews,
    getAllReviewsOfProduct,
    calculateAvgRatingOfAllProducts,
    calculateAvgRatingOfSingleProduct,
}

/* 
        // calculating average rating
        const reviews = await Reviews.find({ product: productId }).lean()
        
        const ratings = await reviews.map(review => review.rating)
        
        const totalRating = ratings.reduce((previousValue, currentValue) =>  {
            return previousValue + currentValue;
        }, 0);

        const avg = (totalRating / reviews.length).toFixed(2)
        
        await Product.findByIdAndUpdate(productId, { avgRating: avg })
*/