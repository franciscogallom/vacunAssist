const router = require("express").Router()
const db = require("../../config/db")

router.post("/:vaccine/:dni", (req, res) => {
  const date = new Date()
  const actualDay = date.getDate()
  const { vaccine, dni } = req.params
  db.query(`SELECT date_of_birth, risk_factor from users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else if (result.length === 0) {
      console.log("DNI no existente")
    } else {
      const age = date.getFullYear() - result[0].date_of_birth.slice(0, 4)
      // Casos para el covid-19.
      if (vaccine === "covid") {
        if (age >= 60) {
          const assignedDay = actualDay + 7
          date.setDate(assignedDay)
          const turn = date.toLocaleDateString()
          db.query(
            `UPDATE inscriptions SET covid = 'Turno para el ${turn}.' WHERE dni = ${dni}`,
            (error, result) => {
              if (error) {
                res.send(error)
              } else if (result.length === 0) {
                res.send("DNI no existente")
              } else {
                res.send("Prioridad confirmada, turno en 7 dias.")
              }
            }
          )
        } else if (age > 18 && age < 60 && result[0].risk_factor) {
          const assignedDay = actualDay + 7
          date.setDate(assignedDay)
          const turn = date.toLocaleDateString()
          db.query(
            `UPDATE inscriptions SET covid = 'Turno para el ${turn}.' WHERE dni = ${dni}`,
            (error, result) => {
              if (error) {
                res.send(error)
              } else if (result.length === 0) {
                res.send("DNI no existente")
              } else {
                res.send("Prioridad confirmada, turno en 7 dias.")
              }
            }
          )
        } else if (age < 18) {
          res.send("Aun no se puede inscribir.")
        } else {
          const turn = "En cola de espera."
          db.query(
            `UPDATE inscriptions SET covid = '${turn}' WHERE dni = ${dni}`,
            (error, result) => {
              if (error) {
                res.send(error)
              } else if (result.length === 0) {
                res.send("DNI no existente")
              } else {
                res.send("En cola de espera para asignacion del turno.")
              }
            }
          )
        }
      }
      // Casos para la fiebre amarilla.
      else if (vaccine === "fever") {
        if (age < 60) {
          const turn = "En cola de espera."
          db.query(
            `UPDATE inscriptions SET fever = '${turn}' WHERE dni = ${dni}`,
            (error, result) => {
              if (error) {
                res.send(error)
              } else if (result.length === 0) {
                res.send("DNI no existente")
              } else {
                res.send("En espera a que se le asigne un turno.")
              }
            }
          )
        } else {
          res.send("No puede inscribirse a la vacuna por ser mayor de 60 años.")
        }
        // Casos para la gripe.
      } else if (vaccine === "flu") {
        if (age >= 60) {
          const assignedDay = actualDay + 90
          date.setDate(assignedDay)
          const turn = date.toLocaleDateString()
          db.query(
            `UPDATE inscriptions SET flu = 'Turno para el ${turn}.' WHERE dni = ${dni}`,
            (error, result) => {
              if (error) {
                res.send(error)
              } else if (result.length === 0) {
                res.send("DNI no existente")
              } else {
                res.send("Turno en los proximos 3 meses.")
              }
            }
          )
        } else {
          const assignedDay = actualDay + 180
          date.setDate(assignedDay)
          const turn = date.toLocaleDateString()
          db.query(
            `UPDATE inscriptions SET flu = 'Turno para el ${turn}.' WHERE dni = ${dni}`,
            (error, result) => {
              if (error) {
                res.send(error)
              } else {
                res.send("Turno en los proximos 6 meses.")
              }
            }
          )
        }
      }
    }
  })
})

router.get("/vaccines/:dni", (req, res) => {
  const { dni } = req.params
  db.query(`SELECT covid, fever, flu FROM inscriptions WHERE dni = ${dni}`, (error, result) => {
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

router.get("/", (req, res) => {
  db.query(`SELECT * FROM inscriptions`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.send(result)
    }
  })
})

router.get("/today", (req, res) => {
  const today = `Turno para el ${new Date().toLocaleDateString()}.`
  db.query(
    `SELECT * FROM inscriptions WHERE covid = '${today}' OR flu = '${today}' OR fever = '${today}'`,
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result)
      }
    }
  )
})

router.post("/apply", (req, res) => {
  const { vaccine, dni } = req.body
  const today = new Date().toLocaleDateString()
  db.query(
    `UPDATE inscriptions SET ${vaccine} = 'Aplicada el ${today}.' WHERE dni = ${dni}`,
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send("Modificación exitosa.")
      }
    }
  )
})

router.post("/lost-turn", (req, res) => {
  const { vaccine, dni } = req.body
  db.query(
    `UPDATE inscriptions SET ${vaccine} = 'No se presento.' WHERE dni = ${dni}`,
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send("Modificación exitosa.")
      }
    }
  )
})

module.exports = router
