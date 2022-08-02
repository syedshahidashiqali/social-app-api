const Order = require("../models/order")
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")

// place an order
const placeOrder = async (req, res) => {
    try {
        const newOrder = await Order.create({
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

// get an order
const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate("userId").populate("products.productId")

        res.status(200).json(apiSuccessWithData("Order Details", order))
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

// all orders of all users
const allOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(apiSuccessWithData("All Orders", orders))
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }

}

// all orders of specific user
const userAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        res.status(200).json(apiSuccessWithData(`All orders for the user: ${ req.params.userId }`, orders))
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

// <<  AGGREGATION PIPELINE  >>

// Total number of monthly orders
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
        const result = await Order.aggregate(pipeline);
        res.status(200).json(result)

    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

// Total number of products purchased in the month
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
        const result = await Order.aggregate(pipeline);
        res.status(200).json(apiSuccessWithData("Total number of Products purchased in the month", result))

    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

module.exports = {
    placeOrder,
    allOrders,
    getOrder,
    userAllOrders,
    aggregationiTotalNumberOfOrdersMonthly,
    aggregationiTotalNumberOfProductsPurchasedMonthly
}

// total number of products purchased in the month
// Total number of orders month wise

/*

Select name, SUM(quantity) as qty from table WHERE size = "medium" GROUP BY name

*/