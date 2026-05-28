const express = require("express")

const router = express.Router()

const {
    createVeiculo,
    getVeiculos,
    getVeiculoById,
    updateVeiculo,
    deleteVeiculo
} = require("../controllers/veiculoController")

router.post("/", createVeiculo)
router.get("/", getVeiculos)
router.get("/:id", getVeiculoById)
router.put("/:id", updateVeiculo)
router.delete("/:id", deleteVeiculo)

module.exports = router