const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
require("dotenv").config()

app.use(cors())

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "vacunassist",
})

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (error, result) => {
    {
      error ? res.send(error) : res.send(result)
    }
  })
})

app.listen(3001, () => {
  console.log("servidor corriendo")
})
