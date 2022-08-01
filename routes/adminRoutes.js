const router = require("express").Router();
const { deleteUser, getAllUsers, updateUser, getUser } = require("../controller/adminController")
const { verifyTokenAndAdmin: authAdmin } = require("../middleware/authMiddleware")

// Delete route
router.delete("/delete/:id", authAdmin, deleteUser)
router.get("/all", authAdmin, getAllUsers)
router.get("/:id", authAdmin, getUser)
router.put("/updateUsers/:id", authAdmin, updateUser)

module.exports = router;