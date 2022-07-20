const router = require("express").Router();
const { deleteUser, getAllUsers, updateUser } = require("../../controller/admin/admin")

// Delete route
router.delete("/delete/:id", deleteUser)
router.get("/getUsers", getAllUsers)
router.put("/updateUsers/:id", updateUser)

module.exports = router;