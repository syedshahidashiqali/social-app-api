const router = require("express").Router();

const { 
    addManyOrders,
    calculateTotalOrderQuantity,
    calculateTotalOrderValueAndAvgOrderQuantity 
} = require("../controller/orderOld")


router.get("/add", addManyOrders)
router.get("/totalOrderQuantity", calculateTotalOrderQuantity)
router.get("/totalOrderValue", calculateTotalOrderValueAndAvgOrderQuantity)

module.exports = router;