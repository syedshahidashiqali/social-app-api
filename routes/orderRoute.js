const router = require("express").Router(); 
const { placeOrder, allOrders, aggregationiTotalNumberOfOrdersMonthly, aggregationiTotalNumberOfProductsPurchasedMonthly } = require("../controller/orderController");

router.post("/placeOrder", placeOrder)
router.get("/all", allOrders)
router.get("/monthlyOrders", aggregationiTotalNumberOfOrdersMonthly)
router.get("/monthlyPurchases", aggregationiTotalNumberOfProductsPurchasedMonthly)

module.exports = router;