const router = require("express").Router();

const { 
    addManyOrders,
    calculateTotalOrderQuantity,
    calculateTotalOrderValueAndAvgOrderQuantity 
} = require("../controller/order")


router.get("/add", addManyOrders)
router.get("/totalOrderQuantity", calculateTotalOrderQuantity)
router.get("/totalOrderValue", calculateTotalOrderValueAndAvgOrderQuantity)

module.exports = router;