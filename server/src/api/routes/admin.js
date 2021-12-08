const router = require("express").Router()
const db = require("../../config/db")

router.post("/add-vaccinator", (req, res) => {
  const { email, name, lastname, dni, password, vaccination } = req.body
  const createdAt = new Date().toLocaleDateString()
  db.query(`SELECT email FROM vaccinators WHERE email='${email}'`, (error, result) => {
    if (error) {
      res.send({ error })
    } else {
      if (result[0]) {
        res.send({ error: true, message: "El email ya está en uso." })
      } else {
        db.query(`SELECT dni FROM vaccinators WHERE dni=${dni}`, (error, result) => {
          if (error) {
            res.send({ error })
          } else if (result[0]) {
            res.send({ error: true, message: "El DNI ya está en uso." })
          } else {
            db.query(
              "INSERT INTO vaccinators (email, name, lastname, dni, password, createdAt, vaccination) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [email, name, lastname, dni, password, createdAt, vaccination],
              (err) => {
                if (err) {
                  res.send({ err })
                } else {
                  res.send("Vacunador añadido.")
                }
              }
            )
          }
        })
      }
    }
  })
})

router.get("/stock", (req, res) => {
  db.query("SELECT * FROM stock", (error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.send(result)
    }
  })
})

router.get("/stock/:vaccination", (req, res) => {
  const { vaccination } = req.params
  db.query(
    `SELECT flu, fever, covid FROM stock WHERE vaccination = (?)`,
    [vaccination],
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result[0])
      }
    }
  )
})

router.put("/add-stock/:vaccination", (req, res) => {
  const { vaccination } = req.params
  const { vaccine, stock } = req.body
  db.query(
    `UPDATE stock SET ${vaccine} = ${vaccine} + ${stock} WHERE vaccination = (?)`,
    [vaccination],
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send("Stock actualizado correctamente.")
      }
    }
  )
})

router.post("/update-turns", (req, res) => {
  const today = new Date()
  today.setDate(today.getDate() - 1) // Para que luego no se actualice cuando el día es el mismo.

  // Actualizo covid.
  db.query(`SELECT covid, dni FROM inscriptions WHERE covid LIKE '%Turno%'`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      result.map((inscription) => {
        let date = inscription.covid.split(" ")
        const arrayDate = date[3].split("/")
        date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0])

        if (date < today) {
          db.query(
            `UPDATE inscriptions SET covid = 'No se presento.' WHERE dni = ${inscription.dni}`,
            (error, result) => {
              if (error) {
                console.log(error)
              } else {
                console.log(
                  `El usuario ${
                    inscription.dni
                  } no se presento a su turno para el COVID del dia ${date.toLocaleDateString()}.`
                )
              }
            }
          )
        }
      })
    }
  })

  // Actualizo covid2.
  db.query(`SELECT covid2, dni FROM inscriptions WHERE covid2 LIKE '%Turno%'`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      result.map((inscription) => {
        let date = inscription.covid2.split(" ")
        const arrayDate = date[3].split("/")
        date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0])

        if (date < today) {
          db.query(
            `UPDATE inscriptions SET covid2 = 'No se presento.' WHERE dni = ${inscription.dni}`,
            (error, result) => {
              if (error) {
                console.log(error)
              } else {
                console.log(
                  `El usuario ${
                    inscription.dni
                  } no se presento a su turno para el COVID2 del dia ${date.toLocaleDateString()}.`
                )
              }
            }
          )
        }
      })
    }
  })

  // Actualizo fever.
  db.query(`SELECT fever, dni FROM inscriptions WHERE fever LIKE '%Turno%'`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      result.map((inscription) => {
        let date = inscription.fever.split(" ")
        const arrayDate = date[3].split("/")
        date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0])

        if (date < today) {
          db.query(
            `UPDATE inscriptions SET fever = 'No se presento.' WHERE dni = ${inscription.dni}`,
            (error, result) => {
              if (error) {
                console.log(error)
              } else {
                console.log(
                  `El usuario ${
                    inscription.dni
                  } no se presento a su turno para FIEBRE del dia ${date.toLocaleDateString()}.`
                )
              }
            }
          )
        }
      })
    }
  })

  // Actualizo gripe.
  db.query(`SELECT flu, dni FROM inscriptions WHERE flu LIKE '%Turno%'`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      result.map((inscription) => {
        let date = inscription.flu.split(" ")
        const arrayDate = date[3].split("/")
        date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0])

        if (date < today) {
          db.query(
            `UPDATE inscriptions SET flu = 'No se presento.' WHERE dni = ${inscription.dni}`,
            (error, result) => {
              if (error) {
                console.log(error)
              } else {
                console.log(
                  `El usuario ${
                    inscription.dni
                  } no se presento a su turno para la GRIPE del dia ${date.toLocaleDateString()}.`
                )
              }
            }
          )
        }
      })
    }
  })

  // Actualizo gripe2.
  db.query(`SELECT flu2, dni FROM inscriptions WHERE flu2 LIKE '%Turno%'`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      result.map((inscription) => {
        let date = inscription.flu2.split(" ")
        const arrayDate = date[3].split("/")
        date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0])

        if (date < today) {
          db.query(
            `UPDATE inscriptions SET flu2 = 'No se presento.' WHERE dni = ${inscription.dni}`,
            (error, result) => {
              if (error) {
                console.log(error)
              } else {
                console.log(
                  `El usuario ${
                    inscription.dni
                  } no se presento a su turno para la GRIPE2 del dia ${date.toLocaleDateString()}.`
                )
              }
            }
          )
        }
      })
    }
  })
  res.send("Actualizaciones realizadas.")
})

module.exports = router
