const router = require("express").Router()
const db = require("../../config/db")
const getTodayDate = require("../../services/getTodayDate")

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

router.get("/today/:vaccination", (req, res) => {
  const { vaccination } = req.params
  const today = getTodayDate()

  db.query(
    `SELECT * FROM inscriptions WHERE (covid = '${today}' OR flu = '${today}' OR fever = '${today}') AND (vaccination = '${vaccination}')`,
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result)
      }
    }
  )
})

router.get("/pending", (req, res) => {
  const filter = "No se presento."
  const secondFilter = "En cola de espera."
  db.query(
    `SELECT * FROM inscriptions WHERE covid = '${filter}' OR flu = '${filter}' OR fever = '${filter}' OR covid = '${secondFilter}' OR flu = '${secondFilter}' OR fever = '${secondFilter}'`,
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result)
      }
    }
  )
})

router.post("/reasign", (req, res) => {
  const { turn, dni, vaccine } = req.body
  let newTurn = turn.length === 9 ? `0${turn}` : turn
  let message
  if (vaccine === "covid") {
    message = "COVID-19"
  } else if (vaccine === "fever") {
    message = "fiebre amarilla"
  } else {
    message = "gripe"
  }
  db.query(
    `UPDATE inscriptions SET ${vaccine} = 'Turno para el ${newTurn}.' WHERE dni = ${dni}`,
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(
          `Turno del usuario de DNI ${dni} para ${message} reasignado exitosamente para el ${turn}.`
        )
      }
    }
  )
})

router.post("/apply", (req, res) => {
  const { vaccine, dni, lot } = req.body
  const todayDate = new Date()
  const UTCDay = todayDate.getDate()
  const day = UTCDay < 10 ? `0${UTCDay}` : UTCDay
  const today = `Aplicada el ${day}/${
    todayDate.getMonth() + 1
  }/${todayDate.getFullYear()} (${lot}).`
  db.query(
    `UPDATE inscriptions SET ${vaccine} = '${today}' WHERE dni = ${dni}`,
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send("Vacuna marcada como aplicada exitosamente.")
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
