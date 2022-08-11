const router = require("express").Router();
const { addProduct, getAllProducts, getProduct, updateProduct } = require("../controllers/product");
const { validationMiddleWare } = require("../middleware/validationMiddleware");
const { createProductValRule } = require("../utils/validateRules")

router.get("/", getAllProducts)
router.get("/product/:id", getProduct)
router.put("/product/:productId", updateProduct)
router.post("/add", validationMiddleWare(createProductValRule), addProduct)

module.exports = router;