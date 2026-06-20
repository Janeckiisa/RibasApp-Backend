const express = require("express")
const router = express.Router()

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    updateRole,
    deleteUser
} = require("../controllers/userController")

router.post("/", createUser)
router.get("/", getUsers)
router.get("/:id", getUserById)
router.put("/:id", updateUser)
router.put("/:id/role", updateRole)
router.delete("/:id", deleteUser)

module.exports = router