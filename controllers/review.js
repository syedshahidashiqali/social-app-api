const mongoose = require("mongoose")
const product = require("../models/product")
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

const calculateRatingCountOfSingleProduct = async (req, res) => {
    try {
        // const rating5 = await Review.find({ productId: req.params.productId, rating: req.params.count }).count();
        /* const rating5 = await Review.find({ productId: req.params.productId, rating: 5 }).count();
        const rating4 = await Review.find({ productId: req.params.productId, rating: 4 }).count();
        const rating3 = await Review.find({ productId: req.params.productId, rating: 3 }).count();
        const rating2 = await Review.find({ productId: req.params.productId, rating: 2 }).count();
        const rating1 = await Review.find({ productId: req.params.productId, rating: 1 }).count();
        res.status(200).json(apiSuccessWithData(`The count of ${req.params.count} stars rating is`, {
            rating5: rating5,
            rating4: rating4,
            rating3: rating3,
            rating2: rating2,
            rating1: rating1,
        })) */
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

const calculateRatingsOfSingleProduct = async (req, res) => {

    try {
        const id = req.params.productId

        let ratingFilter = (rating) => {
            return {
                $filter: {
                    input: '$reviews',
                    as: 'review',
                    cond: {
                        $eq: ['$$review.rating', rating],
                    },

                },
            }
        };

        const pipeline = [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(id),
                }
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews',
                },
            },
            {
                $project: {
                    star_5: {
                        $filter: {
                            input: '$reviews',
                            as: 'review',
                            cond: {
                                $eq: ['$$review.rating', 5],
                            },

                        },
                    },
                    star_4: {
                        $filter: {
                            input: '$reviews',
                            as: 'review',
                            cond: {
                                $eq: ['$$review.rating', 4],
                            },

                        },
                    },
                    star_3: {
                        ...ratingFilter(3),
                    },
                    star_2: {
                        ...ratingFilter(2),
                    },
                    star_1: {
                        ...ratingFilter(1),
                    }
                }
            },
            {
                $project: {
                    star_5: { $size: '$star_5' },
                    star_4: { $size: '$star_4' },
                    star_3: { $size: '$star_3' },
                    star_2: { $size: '$star_2' },
                    star_1: { $size: '$star_1' },
                }
            }
            // {
            //     $project:
            //     {
            //         "_id": 1,
            //         "rating":
            //         {
            //             $switch:
            //             {
            //                 branches: [
            //                     {
            //                         case: { $eq: ["$rating", 5] },
            //                         then: "rating5"
            //                     },
            //                     {
            //                         case: { $eq: ["$rating", 4] },
            //                         then: "rating4"
            //                     },
            //                     {
            //                         case: { $eq: ["$rating", 3] },
            //                         then: "rating3"
            //                     },
            //                     {
            //                         case: { $eq: ["$rating", 2] },
            //                         then: "rating2"
            //                     },
            //                     {
            //                         case: { $eq: ["$rating", 1] },
            //                         then: "rating1"
            //                     },
            //                 ],
            //                 default: "No ratings found."
            //             }
            //         }
            //     }
            // },
            // {
            //     $group: {
            //         _id: null,
            //         _id: "$summary"
            //     }
            // },
            // {
            //     $match: {
            //         "rating": "rating5",
            //         // "rating": rating,
            //     }
            // },
            // {
            //     $count: "rating"
            // }
            // {
            //     $addFields: {
            //         count5: { $eq: ["$summary", "rating5"] }
            //     }
            // }
            // {
            //     $count: { $where: "$summary" === 5 }
            // }
            // {
            //     $group: {
            //         "_id": null,
            //         rating5Count: { $sum: "star5" }
            //     }
            // }
            // {
            //     $count: "summary"
            // }
            // {
            //     $project: {

            //     }
            // },
            // {

            // }
            // {
            //     $project: {
            //         allRates: {
            //             $cond: { if: { $eq: ["$rating", 5] }, then: "rating5", else: "rating4" }
            //         }
            //     }
            // }
            // {
            //     $group: {
            //         _id: null,
            //         rating5: { $eq: ["$rating", "5"] }
            //     }
            // }
            // {
            //     $count: 
            // }
            // {
            //     $lookup: {
            //         from: "Product",
            //         localField: "productId",
            //         foreignField: "_id",
            //         as: "myField"
            //     }
            // },
            // {
            //     $match: {
            //         rating: 4,
            //     }
            // }
            // {
            //     $addFields: {
            //         star5: {
            //             $match: { "$rating": "5" }
            //         },
            //         // star4: { $eq: ["$rating", 4] },
            //         // star3: { $eq: ["$rating", 3] },
            //         // star2: { $eq: ["$rating", 2] },
            //         // star1: { $eq: ["$rating", 1] },
            //         // star4: { $eq: ["$rating", 4] },
            //         // star3: { $eq: ["$rating", 3] },
            //         // star2: { $eq: ["$rating", 2] },
            //         // star1: { $eq: ["$rating", 1] },

            //         // star4: { "rating": 4 },
            //         // star3: { "rating": 3 },
            //         // star2: { "rating": 2 },
            //         // star1: { "rating": 1 },
            //     }
            // },
            // {
            //     $project: {
            //         // rating: 1,
            //         // _id: 0,
            //         // createdAt: 1,
            //         // star5: 1,
            //         // star4: 1,
            //         // star3: 1,
            //         // star2: 1,
            //         // star1: 1
            //     }
            // },
            // {
            //     $group: {
            //         _id: "",
            //         totalNumberOfProductsPurchased: { "$sum": "star5" }
            //     }
            // }

        ];
        const result = await product.aggregate(pipeline)
        res.status(200).json(apiSuccessWithData("The count of stars rating is", result))

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
    calculateRatingsOfSingleProduct,
    calculateRatingCountOfSingleProduct
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