const DocumentoVeiculo = require(
    "../models/DocumentoVeiculo"
)

const createDocumento = async (req, res) => {

    try {

        const documento = await DocumentoVeiculo.create(
            req.body
        )

        res.status(201).json(documento)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const getDocumentos = async (req, res) => {

    try {

        const documentos = await DocumentoVeiculo
            .find({
                isActive: true
            })
            .populate("veiculoId")

        res.json(documentos)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const getDocumentoById = async (req, res) => {

    try {

        const documento = await DocumentoVeiculo
            .findById(req.params.id)
            .populate("veiculoId")

        if (!documento) {

            return res.status(404).json({
                error: "Documento não encontrado"
            })

        }

        res.json(documento)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const updateDocumento = async (req, res) => {

    try {

        const documento = await DocumentoVeiculo
            .findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            )

        res.json(documento)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const deleteDocumento = async (req, res) => {

    try {

        await DocumentoVeiculo.findByIdAndUpdate(
            req.params.id,
            {
                isActive: false
            }
        )

        res.json({
            message: "Documento desativado"
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

module.exports = {
    createDocumento,
    getDocumentos,
    getDocumentoById,
    updateDocumento,
    deleteDocumento
}