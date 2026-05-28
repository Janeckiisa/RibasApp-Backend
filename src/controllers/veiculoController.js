const Veiculo = require("../models/Veiculo")

const createVeiculo = async (req, res) => {

    try {

        const veiculo = await Veiculo.create(req.body)

        res.status(201).json(veiculo)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const getVeiculos = async (req, res) => {

    try {

        const veiculos = await Veiculo.find({
            isActive: true
        }).populate("operador")

        res.json(veiculos)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const getVeiculoById = async (req, res) => {

    try {

        const veiculo = await Veiculo.findById(
            req.params.id
        ).populate("operador")

        res.json(veiculo)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const updateVeiculo = async (req, res) => {

    try {

        const veiculo = await Veiculo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )

        res.json(veiculo)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const deleteVeiculo = async (req, res) => {

    try {

        await Veiculo.findByIdAndUpdate(
            req.params.id,
            {
                isActive: false
            }
        )

        res.json({
            message: "Veículo desativado"
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

module.exports = {
    createVeiculo,
    getVeiculos,
    getVeiculoById,
    updateVeiculo,
    deleteVeiculo
}