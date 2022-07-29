const router = require("express").Router();
const { addProduct, getAllProducts } = require("../controller/productController");
const { validationMiddleWare } = require("../middleware/validationMiddleware");
const { createProductValRule } = require("../utils/validateRules")

router.get("/", validationMiddleWare(createProductValRule), getAllProducts)
router.post("/add", addProduct)

module.exports = router;