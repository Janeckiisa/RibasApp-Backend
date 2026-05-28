const mongoose = require("mongoose")

const UserLoginSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    senha: {
        type: String,
        required: true
    },

    tipoUsuario: {
        type: String,
        enum: ["ADMIN", "OPERADOR", "GESTOR"],
        default: "OPERADOR"
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("UserLogin", UserLoginSchema)