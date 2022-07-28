const router = require("express").Router();
const { addProduct, getAllProducts } = require("../controller/productController");

router.get("/", getAllProducts)
router.post("/add", addProduct)

module.exports = router;