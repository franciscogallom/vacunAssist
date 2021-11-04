const router = require("express").Router()
const db = require("../../config/db")

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (error, result) => {
    error ? res.send(error) : res.send(result)
  })
})

router.get("/:dni", (req, res) => {
  const { dni } = req.params
  db.query(`SELECT name FROM users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      if (result.length === 0) {
        console.log("DNI no existente")
      } else {
        res.send(result[0])
      }
    }
  })
})

router.post("/change-password/:dni", (req, res) => {
  const { password } = req.body
  const { dni } = req.params
  db.query("UPDATE users SET password = ? WHERE dni = ? ", [password, dni], (err) => {
    if (err) {
      res.send({ err })
    } else {
      res.send("Contraseña actualizada.")
    }
  })
})

router.post("/password/:dni", (req, res) => {
  const { password } = req.body
  const { dni } = req.params
  db.query(`SELECT password FROM users WHERE dni = ${dni}`, (err, result) => {
    if (err) {
      res.send({ err })
    } else {
      if (result[0].password === password) {
        res.send({ correctPassword: true })
      } else {
        res.send({ correctPassword: false })
      }
    }
  })
})

module.exports = router
