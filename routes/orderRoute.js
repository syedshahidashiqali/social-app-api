const router = require("express").Router(); 
const { placeOrder, allOrders, getOrder, userAllOrders, aggregationiTotalNumberOfOrdersMonthly, aggregationiTotalNumberOfProductsPurchasedMonthly } = require("../controller/orderController");
const { validationMiddleWare } = require("../middleware/validationMiddleware");
const { placeOrderValRule, getAnOrderByIdValRule } = require("../utils/validateRules")

router.post("/placeOrder", validationMiddleWare(placeOrderValRule), placeOrder)
router.get("/all", allOrders)
router.get("/:orderId", validationMiddleWare(getAnOrderByIdValRule, "param"), getOrder)
router.get("/all/:userId", userAllOrders)
router.get("/monthlyOrders/all", aggregationiTotalNumberOfOrdersMonthly)
router.get("/monthlyPurchases/all", aggregationiTotalNumberOfProductsPurchasedMonthly)

module.exports = router;