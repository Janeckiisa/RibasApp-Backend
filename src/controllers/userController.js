const User = require("../models/User")
const bcrypt = require("bcrypt")
const UserLogin = require("../models/UserLogin")

const createUser = async (req, res) => {

    try {
        const user = await User.create(req.body)
        const senhaTemporaria =
            req.body.matricula + req.body.telefone

        const senhaHash = await bcrypt.hash(
            senhaTemporaria,
            10
        )

        await UserLogin.create({
            userId: user._id,
            senha: senhaHash,
            tipoUsuario: "OPERADOR"
        })

        res.status(201).json({
            message: "Usuário criado",
            senhaTemporaria
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const getUsers = async (req, res) => {

    try {

        const users = await User.find({
            isActive: true
        })

        res.json(users)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        res.json(user)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const updateUser = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.json(user)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const deleteUser = async (req, res) => {

    try {

        await User.findByIdAndUpdate(
            req.params.id,
            {
                isActive: false
            }
        )

        res.json({
            message: "Usuário desativado"
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}