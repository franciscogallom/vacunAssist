const router = require("express").Router()
const db = require("../../config/db")
const sendEmail = require("../../services/sendMail")

router.post("/signup", (req, res) => {
  const { email, name, lastname, dni, password, vaccination, date_of_birth } = req.body
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
                  db.query(
                    "INSERT INTO inscriptions (dni, covid, flu, fever, vaccination) VALUES (?, ?, ?, ?, ?)",
                    [dni, "No inscripto.", "No inscripto.", "No inscripto.", vaccination],
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

router.post("/signup/comorbidities", (req, res) => {
  const { dni, com1, com2, com3, com4, com5, com6, com7, com8, com9, com10, com11, com12 } =
    req.body
  db.query(
    "UPDATE users SET com1 = ?,  com2 = ?, com3 = ?, com4 = ?, com5 = ?, com6 = ?, com7 = ?, com8 = ?, com9 = ?, com10 = ?, com11 = ?, com12 = ? WHERE dni = ? ",
    [com1, com2, com3, com4, com5, com6, com7, com8, com9, com10, com11, com12, dni],
    (err) => {
      if (err) {
        res.send({ err })
      } else {
        if (
          com1 ||
          com2 ||
          com3 ||
          com4 ||
          com5 ||
          com6 ||
          com7 ||
          com8 ||
          com9 ||
          com10 ||
          com11 ||
          com12
        ) {
          db.query("UPDATE users SET risk_factor = true WHERE dni = ?", [dni], (err) => {
            if (err) {
              res.send({ err })
            }
          })
        } else {
          db.query("UPDATE users SET risk_factor = false WHERE dni = ?", [dni], (err) => {
            if (err) {
              res.send({ err })
            }
          })
        }
        res.send("Comorbilidades añadidas.")
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
      if (result.length > 0) {
        if (result[0].password === password && result[0].confirmed) {
          res.send("Inicio de sesión exitoso")
        } else {
          if (result[0].confirmed === 0 && result[0].password === password) {
            res.send({
              error: true,
              confirmed: true,
              message: "Usuario no verificado.",
            })
          } else {
            res.send({
              error: true,
              message: "El DNI o la contraseña no son correctos.",
            })
          }
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

router.post("/sendEmail/:dni", (req, res) => {
  const { dni } = req.params
  const { verificationCode } = req.body
  db.query(`SELECT email FROM users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send({ error })
    } else {
      sendEmail(result[0].email, verificationCode)
        .then(() => res.send(`Email enviado correctamente a ${result[0].email}.`))
        .catch(() => res.send("Algo salio mal..."))
    }
  })
})

router.post("/verification/:dni", (req, res) => {
  const { dni } = req.params
  db.query(`UPDATE users SET confirmed = true WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else if (result.affectedRows === 0) {
      res.send("No existe el DNI.")
    } else {
      res.send("Confirmación realizada.")
    }
  })
})

module.exports = router
