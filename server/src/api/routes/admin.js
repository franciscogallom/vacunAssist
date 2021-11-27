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

module.exports = router
