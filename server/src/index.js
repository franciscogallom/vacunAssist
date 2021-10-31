require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const { users } = require("./api/routes/index")

// Middlewares
app.use(cors())

// Routes
app.use("/api/users", users)

app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080")
})
