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
  db.query(`SELECT * FROM inscriptions`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      const today = new Date()
      today.setDate(today.getDate() - 1) // Para que luego no se actualice cuando el día es el mismo.

      result.map((inscription) => {
        let covidDate = inscription.covid.slice(14, 24)
        let feverDate = inscription.fever.slice(14, 24)
        let fluDate = inscription.flu.slice(14, 24)

        const arrayCovidDate = covidDate.split("/")
        const arrayFeverDate = feverDate.split("/")
        const arrayFluDate = fluDate.split("/")

        covidDate = new Date(arrayCovidDate[2], arrayCovidDate[1] - 1, arrayCovidDate[0])
        feverDate = new Date(arrayFeverDate[2], arrayFeverDate[1] - 1, arrayFeverDate[0])
        fluDate = new Date(arrayFluDate[2], arrayFluDate[1] - 1, arrayFluDate[0])

        if (covidDate < today) {
          db.query(
            `UPDATE inscriptions SET covid = 'No se presento.' WHERE dni = ${inscription.dni}`,
            (error, result) => {
              if (error) {
                res.send(error)
              } else {
                console.log(
                  `El usuario ${
                    inscription.dni
                  } no se presento a su turno para el COVID del dia ${covidDate.toLocaleDateString()}.`
                )
              }
            }
          )
        }

        if (feverDate < today) {
          db.query(
            `UPDATE inscriptions SET fever = 'No se presento.' WHERE dni = ${inscription.dni}`,
            (error, result) => {
              if (error) {
                res.send(error)
              } else {
                console.log(
                  `El usuario ${
                    inscription.dni
                  } no se presento a su turno para la fiebre amarilla del dia ${feverDate.toLocaleDateString()}.`
                )
              }
            }
          )
        }

        if (fluDate < today) {
          db.query(
            `UPDATE inscriptions SET flu = 'No se presento.' WHERE dni = ${inscription.dni}`,
            (error, result) => {
              if (error) {
                res.send(error)
              } else {
                console.log(
                  `El usuario ${
                    inscription.dni
                  } no se presento a su turno para la gripe del dia ${fluDate.toLocaleDateString()}.`
                )
              }
            }
          )
        }
      })

      res.send("Actualizaciones realizadas.")
    }
  })
})

module.exports = router
