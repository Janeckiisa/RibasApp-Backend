const User = require("../models/User")
const bcrypt = require("bcrypt")
const UserLogin = require("../models/UserLogin")

const TIPOS_VALIDOS = ["OPERADOR", "GESTOR", "ADMIN"]

const createUser = async (req, res) => {

    try {
        // Separa tipoUsuario dos dados do User
        // (User model não tem esse campo)
        const { tipoUsuario, ...dadosUser } = req.body

        const user = await User.create(dadosUser)

        const senhaTemporaria =
            dadosUser.matricula + dadosUser.telefone

        const senhaHash = await bcrypt.hash(
            senhaTemporaria,
            10
        )

        // tipoUsuario pode chegar como string vazia — tratar como ausente
        const tipoLimpo = tipoUsuario && tipoUsuario.trim()
        const tipo = TIPOS_VALIDOS.includes(tipoLimpo)
            ? tipoLimpo
            : "OPERADOR"

        await UserLogin.create({
            userId: user._id,
            senha: senhaHash,
            tipoUsuario: tipo
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
            isActive: true //desativar esse para pegar os usuários desativados
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

const getRole = async (req, res) => {

    try {

        const userLogin = await UserLogin.findOne({
            userId: req.params.id,
            isActive: true
        })

        if (!userLogin) {
            return res.status(404).json({
                error: "Login do usuário não encontrado"
            })
        }

        res.json({
            tipoUsuario: userLogin.tipoUsuario
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const updateRole = async (req, res) => {

    try {

        const { tipoUsuario } = req.body

        if (!TIPOS_VALIDOS.includes(tipoUsuario)) {
            return res.status(400).json({
                error: "Tipo de usuário inválido. Use: OPERADOR, GESTOR ou ADMIN"
            })
        }

        const userLogin = await UserLogin.findOneAndUpdate(
            { userId: req.params.id, isActive: true },
            { tipoUsuario },
            { new: true }
        )

        if (!userLogin) {
            return res.status(404).json({
                error: "Login do usuário não encontrado"
            })
        }

        res.json({
            message: "Nível de acesso atualizado",
            tipoUsuario: userLogin.tipoUsuario
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
    getRole,
    updateUser,
    updateRole,
    deleteUser
}