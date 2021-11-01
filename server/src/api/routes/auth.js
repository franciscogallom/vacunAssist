const router = require("express").Router()
const db = require("../../config/db")

router.post("/signup", (req, res) => {
  const { email, name, lastname, dni, password, vaccination, date_of_birth } = req.body
  const confirmed = false
  const createdAt = new Date().toLocaleString()
  db.query(
    "INSERT INTO users (email, name, lastname, dni, password, vaccination, date_of_birth, confirmed, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [email, name, lastname, dni, password, vaccination, date_of_birth, confirmed, createdAt],
    (err) => {
      if (err) {
        res.send({ err })
      } else {
        res.send("Usuario añadido.")
      }
    }
  )
})

router.post("/login", (req, res) => {
  const { dni, password } = req.body
  db.query(`SELECT password, confirmed FROM users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      if (result[0].password === password && result[0].confirmed) {
        res.send("Inicio de sesión exitoso")
      } else {
        res.send("La contraseña no coincide o el usuario no esta confirmado")
      }
    }
  })
})

module.exports = router
