const router = require("express").Router();
const { addProduct, getAllProducts, getProduct } = require("../controller/productController");
const { validationMiddleWare } = require("../middleware/validationMiddleware");
const { createProductValRule } = require("../utils/validateRules")

router.get("/", getAllProducts)
router.get("/product/:id", getProduct)
router.post("/add", validationMiddleWare(createProductValRule), addProduct)

module.exports = router;