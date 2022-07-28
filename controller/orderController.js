const ProductOrder = require("../models/orderModel")
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")

const placeOrder = async (req, res) => {
    try {
        const newOrder = await ProductOrder.create({
            userId: req.body.userId,
            address: req.body.address,
            products: req.body.products
        })

        const order = await newOrder.save()

        res.status(201).json(apiSuccessWithData("Order is placed successfully", order))
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await ProductOrder.find()
        res.status(200).json(apiSuccessWithData("All Orders", orders))
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }

}

const userAllOrders = async (req, res) => {
    try {
        const orders = await ProductOrder.find({ userId: req.params.userId })
        res.status(200).json(apiSuccessWithData(`All orders for the user: ${ req.params.userId }`, orders))
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

// AGGREGATION PIPELINE
const aggregationiTotalNumberOfOrdersMonthly = async (req, res) => {

    try {
        const pipeline = [
            {
                $group: {
                    _id: { month: { "$month": "$createdAt" } },
                    totalNumberOfOrders: { "$sum": 1 }
                }
            }
        ];
        const result = await ProductOrder.aggregate(pipeline);
        res.status(200).json(result)

    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

const aggregationiTotalNumberOfProductsPurchasedMonthly = async (req, res) => {

    try {
        const pipeline = [
            {
                $unwind: "$products"
            },
            {
                $project: {
                    products: 1,
                    _id: 0,
                    createdAt: 1
                }
            },
            {
                $group: {
                    _id: { month: { "$month": "$createdAt" } },
                    totalNumberOfProductsPurchased: { "$sum": "$products.quantity" }
                }
            }

        ];
        const result = await ProductOrder.aggregate(pipeline);
        res.status(200).json(apiSuccessWithData("Total number of Products purchased in the month", result))

    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

module.exports = {
    placeOrder,
    allOrders,
    userAllOrders,
    aggregationiTotalNumberOfOrdersMonthly,
    aggregationiTotalNumberOfProductsPurchasedMonthly
}

// total number of products purchased in the month
// Total number of orders month wise

/*

Select name, SUM(quantity) as qty from table WHERE size = "medium" GROUP BY name

*/