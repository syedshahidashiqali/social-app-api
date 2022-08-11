const router = require("express").Router();
const { placeOrder, allOrders, getOrder, userAllOrders, aggregationiTotalNumberOfOrdersMonthly, aggregationiTotalNumberOfProductsPurchasedMonthly, aggregationTotalPurchases } = require("../controllers/order");
const { validationMiddleWare } = require("../middleware/validationMiddleware");
const { placeOrderValRule } = require("../utils/validateRules")

router.post("/placeOrder", validationMiddleWare(placeOrderValRule), placeOrder)
router.get("/all", allOrders)
router.get("/:orderId", getOrder)
router.get("/all/:userId", userAllOrders)
router.get("/monthlyOrders/all", aggregationiTotalNumberOfOrdersMonthly)
router.get("/monthlyPurchases/all", aggregationiTotalNumberOfProductsPurchasedMonthly)
router.get("/purchases/all", aggregationTotalPurchases)

module.exports = router;