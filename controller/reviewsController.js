const Reviews = require("../models/reviewsModel")
const { apiError, apiSuccess } = require("../utils/apiHelpers")
const Product = require("../models/productModel")

const addReview = async (req, res) => {
    try {
        const { user: userId, product: productId, detail, rating } = await req.body;

        const newReview = await Reviews.create({
            user: userId,
            product: productId,
            detail: detail,
            rating: rating
        })

        await newReview.save()

        res.status(201).json(apiSuccess("Your review has been posted."))

        // calculating average rating
        const reviews = await Reviews.find({ product: productId }).lean()
        
        const ratings = await reviews.map(review => review.rating)
        
        const totalRating = ratings.reduce((previousValue, currentValue) =>  {
            return previousValue + currentValue;
        }, 0);

        const avg = (totalRating / reviews.length).toFixed(2)
        
        await Product.findByIdAndUpdate(productId, { avgRating: avg })

    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

module.exports = {
    addReview
}