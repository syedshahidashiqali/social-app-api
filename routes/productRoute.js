const router = require("express").Router();
const { addProduct, getAllProducts } = require("../controller/productController");
const { validationMiddleWare } = require("../middleware/validationMiddleware");
const { createProductValRule } = require("../utils/validateRules")

router.get("/", getAllProducts)
router.post("/add", validationMiddleWare(createProductValRule), addProduct)

module.exports = router;