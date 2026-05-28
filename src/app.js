const express = require("express")
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const veiculoRoutes = require("./routes/veiculoRoutes")
const documentoVeiculoRoutes = require(
    "./routes/documentoVeiculoRoutes"
)

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", userRoutes)

app.use("/auth", authRoutes)

app.use("/veiculos", veiculoRoutes)

app.use(
    "/documentos-veiculo",
    documentoVeiculoRoutes
)

module.exports = app