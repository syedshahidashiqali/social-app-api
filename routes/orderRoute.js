const router = require("express").Router(); 
const { placeOrder, allOrders, userAllOrders, aggregationiTotalNumberOfOrdersMonthly, aggregationiTotalNumberOfProductsPurchasedMonthly } = require("../controller/orderController");

router.post("/placeOrder", placeOrder)
router.get("/all", allOrders)
router.get("/all/:userId", userAllOrders)
router.get("/monthlyOrders", aggregationiTotalNumberOfOrdersMonthly)
router.get("/monthlyPurchases", aggregationiTotalNumberOfProductsPurchasedMonthly)

module.exports = router;