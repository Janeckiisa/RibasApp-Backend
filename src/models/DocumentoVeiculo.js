const mongoose = require("mongoose")

const DocumentoVeiculoSchema = new mongoose.Schema({

    veiculoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Veiculo",
        required: true
    },

    nome: {
        type: String,
        required: true
    },

    documentoUrl: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model(
    "DocumentoVeiculo",
    DocumentoVeiculoSchema
)