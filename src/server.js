require("dotenv").config()

const mongoose = require("mongoose")
const app = require("./app")

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo conectado")

        const PORT =
            process.env.PORT || 3000

        app.listen(PORT, () => {
            console.log(
                `Servidor rodando na porta ${PORT}`
            )
        })
    })
    .catch((err) => {
        console.log(err)
    })