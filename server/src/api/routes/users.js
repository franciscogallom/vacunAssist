const router = require("express").Router()
const db = require("../../config/db")

router.get("/all/:dni", (req, res) => {
  const { dni } = req.params
  db.query(`SELECT * FROM users WHERE dni = ${dni}`, (error, result) => {
    error ? res.send(error) : res.send(result[0])
  })
})

router.get("/:dni", (req, res) => {
  const { dni } = req.params
  db.query(`SELECT name FROM users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      if (result.length === 0) {
        res.send("DNI no existente")
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

router.get("/comorbidities/:dni", (req, res) => {
  const { dni } = req.params
  db.query(
    `SELECT com1, com2, com3, com4, com5, com6, com7, com8, com9, com10, com11, com12 FROM users WHERE dni = ${dni}`,
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        if (result.length === 0) {
          res.send("DNI no existente")
        } else {
          res.send(result[0])
        }
      }
    }
  )
})

router.get("/vaccination/:dni", (req, res) => {
  const { dni } = req.params
  db.query(`SELECT vaccination FROM users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      if (result.length === 0) {
        res.send("DNI no existente")
      } else {
        res.send(result[0].vaccination)
      }
    }
  })
})

router.put("/update-vaccination/:dni", (req, res) => {
  const { dni } = req.params
  const { vaccination } = req.body
  db.query(`UPDATE users SET vaccination = ? WHERE dni = ?`, [vaccination, dni], (error) => {
    if (error) {
      res.send(error)
    } else {
      db.query(
        `UPDATE inscriptions SET vaccination = ? WHERE dni = ?`,
        [vaccination, dni],
        (error) => {
          if (error) {
            res.send(error)
          } else {
            res.send("Vacunatorio actualizado exitosamente.")
          }
        }
      )
    }
  })
})

module.exports = router
