const express = require("express")
const authMiddleware = require(
    "../middlewares/authMiddleware"
)
const router = express.Router()

const {
    register,
    login,
    changePassword
} = require("../controllers/authController")

router.post("/register", register)
router.post("/login", login)
router.put(
    "/change-password",
    authMiddleware,
    changePassword
)

module.exports = router