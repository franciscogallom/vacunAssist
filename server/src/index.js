require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const { users, auth, inscriptions, admin, vaccinators } = require("./api/routes/index")

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/users", users)
app.use("/api/auth", auth)
app.use("/api/inscriptions", inscriptions)
app.use("/api/admin", admin)
app.use("/api/vaccinators", vaccinators)

app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080")
})
