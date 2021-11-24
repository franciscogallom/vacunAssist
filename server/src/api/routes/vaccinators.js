const router = require("express").Router()
const db = require("../../config/db")

router.post("/login", (req, res) => {
  const { dni, password } = req.body
  db.query(`SELECT password FROM vaccinators WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      if (result.length > 0) {
        if (result[0].password === password) {
          res.send("Inicio de sesión exitoso.")
        } else {
          res.send({
            error: true,
            message: "El DNI o la contraseña no son correctos.",
          })
        }
      } else {
        res.send({
          error: true,
          message: "El DNI o la contraseña no son correctos.",
        })
      }
    }
  })
})

router.get("/name/:dni", (req, res) => {
  const { dni } = req.params
  db.query(`SELECT name FROM vaccinators WHERE dni = ${dni}`, (error, result) => {
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

router.post("/add-user", (req, res) => {
  const { email, name, lastname, dni, password, vaccination, date_of_birth, vaccine } = req.body
  const confirmed = false
  const createdAt = new Date().toLocaleString()

  db.query(`SELECT email FROM users WHERE email='${email}'`, (error, result) => {
    if (error) {
      res.send({ error })
    } else {
      if (result[0]) {
        res.send({ error: true, message: "El email ya está en uso." })
      } else {
        db.query(`SELECT dni FROM users WHERE dni=${dni}`, (error, result) => {
          if (error) {
            res.send({ error })
          } else if (result[0]) {
            res.send({ error: true, message: "El DNI ya está en uso." })
          } else {
            db.query(
              "INSERT INTO users (email, name, lastname, dni, password, vaccination, date_of_birth, confirmed, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [
                email,
                name,
                lastname,
                dni,
                password,
                vaccination,
                date_of_birth,
                confirmed,
                createdAt,
              ],
              (err) => {
                if (err) {
                  res.send({ err })
                } else {
                  // El usuario se creo correctamente. Se crea una nueva fila en la tabla "inscriptions"
                  const date = new Date().toLocaleDateString()
                  db.query(
                    `INSERT INTO inscriptions (dni, ${vaccine}) VALUES (?, ?)`,
                    [dni, date],
                    (err) => {
                      if (err) {
                        res.send(err)
                      } else {
                        res.send("Usuario añadido.")
                      }
                    }
                  )
                }
              }
            )
          }
        })
      }
    }
  })
})

module.exports = router
