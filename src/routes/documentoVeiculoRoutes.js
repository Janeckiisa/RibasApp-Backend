const express = require("express")

const router = express.Router()

const {
    createDocumento,
    getDocumentos,
    getDocumentoById,
    updateDocumento,
    deleteDocumento
} = require("../controllers/documentoVeiculoController")

router.post("/", createDocumento)
router.get("/", getDocumentos)
router.get("/:id", getDocumentoById)
router.put("/:id", updateDocumento)
router.delete("/:id", deleteDocumento)

module.exports = router