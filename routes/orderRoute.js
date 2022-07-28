const router = require("express").Router(); 
const { placeOrder, allOrders, getOrder, userAllOrders, aggregationiTotalNumberOfOrdersMonthly, aggregationiTotalNumberOfProductsPurchasedMonthly } = require("../controller/orderController");

router.post("/placeOrder", placeOrder)
router.get("/all", allOrders)
router.get("/:orderId", getOrder)
router.get("/all/:userId", userAllOrders)
router.get("/monthlyOrders/all", aggregationiTotalNumberOfOrdersMonthly)
router.get("/monthlyPurchases/all", aggregationiTotalNumberOfProductsPurchasedMonthly)

module.exports = router;