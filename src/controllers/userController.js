const User = require("../models/User")

const createUser = async (req, res) => {

    try {

        const user = await User.create(req.body)

        res.status(201).json(user)

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