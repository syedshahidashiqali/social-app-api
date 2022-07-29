const router = require("express").Router();
const { deleteUser, getAllUsers, updateUser } = require("../controller/adminController")
const { verifyTokenAndAdmin: authAdmin } = require("../middleware/authMiddleware")

// Delete route
router.delete("/delete/:id", authAdmin, deleteUser)
router.get("/getUsers", authAdmin, getAllUsers)
router.put("/updateUsers/:id", authAdmin, updateUser)

module.exports = router;