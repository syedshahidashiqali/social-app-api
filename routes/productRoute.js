const router = require("express").Router();
const { addProduct, getAllProducts } = require("../controller/productController");
const { productValMid } = require("../middleware/validationMiddleware");

router.get("/", productValMid, getAllProducts)
router.post("/add", addProduct)

module.exports = router;