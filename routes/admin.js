const router = require("express").Router();
const { deleteUser, getAllUsers, updateUser, getUser, adminLogin, getAllUsersCount } = require("../controllers/admin")
const { verifyTokenAndAdmin: authAdmin } = require("../middleware/authMiddleware")

// Delete route
router.post("/login", adminLogin)
router.delete("/users/delete/:id", authAdmin, deleteUser)
router.get("/users/all", authAdmin, getAllUsers)
router.get("/users/:id", authAdmin, getUser)
router.put("/users/updateUsers/:id", authAdmin, updateUser)
router.get("/users/count/all", authAdmin, getAllUsersCount)

module.exports = router;