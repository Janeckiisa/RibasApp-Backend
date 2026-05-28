const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    matricula: {
        type: String,
        required: true,
        unique: true
    },

    cargo: {
        type: String
    },

    telefone: {
        type: String
    },

    cnh: {
        type: String
    },

    validadeCNH: {
        type: Date
    },

    aso: {
        type: Boolean
    },

    treinamento: {
        type: Boolean
    },

    validadeTreinamento: {
        type: Date
    },

    status: {
        type: String
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema)