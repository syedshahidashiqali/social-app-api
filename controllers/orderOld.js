const Order = require("../models/order");
const { apiSuccessWithData, apiSuccess, apiError, apiValidationErrors } = require("../utils/apiHelpers")

const addManyOrders = async (req, res) => {
    try {
        const inserted = await Order.insertMany([
            { id: 0, name: "Pepperoni", size: "small", price: 19, quantity: 10, date: new Date("2021-03-13T08:14:30Z").toISOString() },
            { id: 1, name: "Pepperoni", size: "medium", price: 20, quantity: 20, date: new Date("2021-03-13T09:13:24Z").toISOString()},
            { id: 2, name: "Pepperoni", size: "large", price: 21, quantity: 30, date: new Date("2021-03-17T09:22:12Z").toISOString() },
            { id: 3, name: "Cheese", size: "small", price: 12, quantity: 15, date: new Date("2021-03-13T11:21:39.736Z").toISOString() },
            { id: 4, name: "Cheese", size: "medium", price: 13, quantity:50, date: new Date("2022-01-12T21:23:13.331Z").toISOString() },
            { id: 5, name: "Cheese", size: "large", price: 14, quantity: 10, date: new Date("2022-01-12T05:08:13Z").toISOString() },
            { id: 6, name: "Vegan", size: "small", price: 17, quantity: 10, date: new Date("2021-01-13T05:08:13Z").toISOString() },
            { id: 7, name: "Vegan", size: "medium", price: 18, quantity: 10, date: new Date("2021-01-13T05:10:13Z").toISOString() }
         ])
    
         res.status(201).json(apiSuccessWithData("Added Many Orders using insertMany.", inserted));
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

// Calculate Total Order Quantity
const calculateTotalOrderQuantity = async (req, res) => {
    const pipeline = [
        // Stage 1: Filter pizza order documents by pizza size
        {
            $match: { size: "medium" }
        },
        
        // Stage 2: Group remaining documents by pizza name and calculate total quantity
        {
            $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
        }
    ];
    try {
        
        const result = await Order.aggregate(pipeline);
        
        console.log("Aggregated Data is:")

        for await (const doc of result) {
            console.log(doc);
        }
        
        res.status(200).json(apiSuccessWithData("Calculate Total Order Quantity", result))  
    } catch(err) {
        console.log(err)
        res.status(500).json(apiError(err.message))
    }
}

const sumArr = () => {
    const arr = [
        { id: 0, name: "Pepperoni", size: "small", price: 19, quantity: 10, date: new Date("2021-03-13T08:14:30Z").toISOString() },
        { id: 1, name: "Pepperoni", size: "medium", price: 20, quantity: 20, date: new Date("2021-03-13T09:13:24Z").toISOString()},
        { id: 2, name: "Pepperoni", size: "large", price: 21, quantity: 30, date: new Date("2021-03-17T09:22:12Z").toISOString() },
     ]
 
     const prices = arr.map(item => {
        const prices = item.price * item.quantity;
        return prices
     })
     console.log(prices)

     const total = prices.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
      }, 0);

      console.log(total)
}

sumArr()

// Calculate Total Order Value and Average Order Quantity
const calculateTotalOrderValueAndAvgOrderQuantity = async (req, res) => {
    const pipeline = [
        // Stage 1: Filter pizza order documents by name
        {
            $match:
            {
                name: "Pepperoni"
            }
        },

        // Stage 2: Group remaining documents by name and calculate results
        {
            $group:
            {
                _id: "$name",
                totalOrderValue: { $sum : { $multiply: [ "$price", "$quantity" ] } },
                averageOrderQuantity: { $avg: "$quantity" }
            }
        }, 

        // Stage 3: Sort documents by totalOrderValue in descending order
        {
            $sort: { totalOrderValue: -1 }
        }
    ];
    try {

        const result = await Order.aggregate(pipeline);

        console.log("Aggregated Data is:")

        for await (const doc of result) {
            console.log(doc);
        }
        
        res.status(200).json(apiSuccessWithData("Calculate Total Order Value and Average Order Quantity", result));
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }
}

module.exports = {
    addManyOrders,
    calculateTotalOrderQuantity,
    calculateTotalOrderValueAndAvgOrderQuantity
}