const mongoose = require("mongoose")

const VeiculoSchema = new mongoose.Schema({

    operador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    placa: {
        type: String,
        required: true,
        unique: true
    },

    modelo: {
        type: String,
        required: true
    },

    categoria: {
        type: String,
        enum: [
            "GUINDASTE",
            "CAMINHAO",
            "MUNCK",
            "EMPILHADEIRA"
        ]
    },

    status: {
        type: String
    },

    capacidade: {
        type: Number
    },

    ultimaInspecao: {
        type: Date
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Veiculo", VeiculoSchema)