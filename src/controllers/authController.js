const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const UserLogin = require("../models/UserLogin")

const register = async (req, res) => {

    try {

        const { userId, senha, tipoUsuario } = req.body

        const senhaHash = await bcrypt.hash(senha, 10)

        const login = await UserLogin.create({
            userId,
            senha: senhaHash,
            tipoUsuario
        })

        res.status(201).json(login)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const login = async (req, res) => {

    try {
        const { matricula, senha } = req.body

        const usuario = await User.findOne({
            matricula,
            isActive: true
        })

        if (!usuario) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        const userLogin = await UserLogin.findOne({
            userId: usuario._id,
            isActive: true
        })

        if (!userLogin) {
            return res.status(404).json({
                error: "Login não encontrado"
            })
        }

        const senhaValida = await bcrypt.compare(
            senha,
            userLogin.senha
        )

        if (!senhaValida) {
            return res.status(401).json({
                error: "Senha inválida"
            })
        }

        const token = jwt.sign(
            {
                id: userLogin._id,
                tipo: userLogin.tipoUsuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.json({
            token,
            primeiroLogin:
                userLogin.primeiroLogin,
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                matricula: usuario.matricula,
                cargo: usuario.cargo
            }
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const { novaSenha } = req.body
        const senhaHash = await bcrypt.hash(
            novaSenha,
            10
        )

        await UserLogin.findByIdAndUpdate(
            req.user.id,
            {
                senha: senhaHash,
                primeiroLogin: false
            }
        )

        res.json({
            message: "Senha alterada"
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }

}

module.exports = {
    register,
    login,
    changePassword
}