const express = require("express")
const router = express.Router()

const {
    createUser,
    getUsers,
    getUserById,
    getRole,
    updateUser,
    updateRole,
    deleteUser
} = require("../controllers/userController")

router.post("/", createUser)
router.get("/", getUsers)
router.get("/:id", getUserById)
router.get("/:id/role", getRole)
router.put("/:id", updateUser)
router.put("/:id/role", updateRole)
router.delete("/:id", deleteUser)

module.exports = router