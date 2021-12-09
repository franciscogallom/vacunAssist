const router = require("express").Router()
const db = require("../../config/db")

router.post("/:vaccine/:dni", (req, res) => {
  const date = new Date()
  const actualDay = date.getDate()
  const { vaccine, dni } = req.params
  db.query(
    `SELECT date_of_birth, risk_factor, vaccination from users WHERE dni = ${dni}`,
    (error, result) => {
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
            let availables
            let total
            const vaccination = result[0].vaccination
            db.query(
              `SELECT covid FROM inscriptions WHERE (covid= 'Turno para el ${turn}.') and (vaccination= '${result[0].vaccination}') `,
              (error, result) => {
                if (error) {
                  res.send(error)
                } else {
                  availables = result.length
                  db.query(
                    `SELECT covid FROM stock WHERE (vaccination= '${vaccination}') `,
                    (error, result) => {
                      if (error) {
                        res.send(error)
                      } else {
                        total = result[0].covid

                        if (total - availables > 0) {
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
                        } else {
                          res.send({
                            error: true,
                            message:
                              "Lo sentimos! No contamos con vacunas disponibles. Vuelva a intentarlo mañana.",
                          })
                        }
                      }
                    }
                  )
                }
              }
            )
          } else if (age > 18 && age < 60 && result[0].risk_factor) {
            const assignedDay = actualDay + 7
            date.setDate(assignedDay)
            const turn = date.toLocaleDateString()
            const vaccination = result[0].vaccination
            let availables
            let total
            db.query(
              `SELECT covid FROM inscriptions WHERE (covid= 'Turno para el ${turn}.') and (vaccination= '${result[0].vaccination}') `,
              (error, result) => {
                if (error) {
                  res.send(error)
                } else {
                  availables = result.length
                  db.query(
                    `SELECT covid FROM stock WHERE (vaccination= '${vaccination}') `,
                    (error, result) => {
                      if (error) {
                        res.send(error)
                      } else {
                        total = result[0].covid
                        if (total - availables > 0) {
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
                        } else {
                          res.send({
                            error: true,
                            message:
                              "Lo sentimos! No contamos con vacunas disponibles. Vuelva a intentarlo mañana.",
                          })
                        }
                      }
                    }
                  )
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
            let availables
            let total
            const vaccination = result[0].vaccination
            db.query(
              `SELECT flu FROM inscriptions WHERE (flu= 'Turno para el ${turn}.') and (vaccination= '${result[0].vaccination}') `,
              (error, result) => {
                if (error) {
                  res.send(error)
                } else {
                  availables = result.length
                  db.query(
                    `SELECT flu FROM stock WHERE (vaccination= '${vaccination}') `,
                    (error, result) => {
                      if (error) {
                        res.send(error)
                      } else {
                        total = result[0].flu
                        if (total - availables > 0) {
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
                          res.send({
                            error: true,
                            message:
                              "Lo sentimos! No contamos con vacunas disponibles. Vuelva a intentarlo mañana.",
                          })
                        }
                      }
                    }
                  )
                }
              }
            )
          } else {
            const assignedDay = actualDay + 180
            date.setDate(assignedDay)
            const turn = date.toLocaleDateString()
            let availables
            let total
            const vaccination = result[0].vaccination
            db.query(
              `SELECT flu FROM inscriptions WHERE (flu= 'Turno para el ${turn}.') and (vaccination= '${result[0].vaccination}') `,
              (error, result) => {
                if (error) {
                  res.send(error)
                } else {
                  availables = result.length
                  db.query(
                    `SELECT flu FROM stock WHERE (vaccination= '${vaccination}') `,
                    (error, result) => {
                      if (error) {
                        res.send(error)
                      } else {
                        total = result[0].flu
                        if (total - availables > 0) {
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
                        } else {
                          res.send({
                            error: true,
                            message:
                              "Lo sentimos! No contamos con vacunas disponibles. Vuelva a intentarlo mañana.",
                          })
                        }
                      }
                    }
                  )
                }
              }
            )
          }
        }
      }
    }
  )
})

router.get("/vaccines/:dni", (req, res) => {
  const { dni } = req.params
  db.query(
    `SELECT covid, covid2, fever, flu, flu2 FROM inscriptions WHERE dni = ${dni}`,
    (error, result) => {
      if (error) {
        res.send(error)
      } else {
        if (result.length === 0) {
          console.log("DNI no existente")
        } else {
          res.send(result[0])
        }
      }
    }
  )
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
  const today = `Turno para el ${new Date().toLocaleDateString()}.`

  db.query(
    `SELECT * FROM inscriptions WHERE (covid = '${today}' OR covid2 = '${today}' OR flu = '${today}' OR flu2 = '${today}' OR fever = '${today}') AND (vaccination = '${vaccination}')`,
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
    `SELECT * FROM inscriptions WHERE covid = '${filter}' OR covid2 = '${filter}' OR flu = '${filter}' OR flu2 = '${filter}' OR fever = '${filter}' OR covid = '${secondFilter}' OR covid2 = '${secondFilter}' OR flu = '${secondFilter}' OR flu2 = '${secondFilter}' OR fever = '${secondFilter}'`,
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

  let vaccination
  db.query(`SELECT vaccination FROM users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(result)
    } else {
      vaccination = result[0].vaccination
      let availables
      let total
      db.query(
        `SELECT ${vaccine} FROM inscriptions WHERE (${vaccine}= 'Turno para el ${turn}.') and (vaccination= '${vaccination}') `,
        (error, result) => {
          if (error) {
            res.send(error)
          } else {
            availables = result.length
            db.query(
              `SELECT ${
                vaccine === "covid2" ? "covid" : vaccine
              } FROM stock WHERE (vaccination= '${vaccination}') `,
              (error, result) => {
                if (error) {
                  res.send(error)
                } else {
                  total = result[0][vaccine === "covid2" ? "covid" : vaccine]

                  if (total - availables > 0) {
                    db.query(
                      `UPDATE inscriptions SET ${vaccine} = 'Turno para el ${turn}.' WHERE dni = ${dni}`,
                      (error, result) => {
                        if (error) {
                          res.send(error)
                        } else {
                          res.send(
                            `Turno del usuario de DNI ${dni} reasignado exitosamente para el ${turn}.`
                          )
                        }
                      }
                    )
                  } else {
                    res.send({
                      error: true,
                      message: "No contamos con vacunas disponibles para esta fecha.",
                    })
                  }
                }
              }
            )
          }
        }
      )
    }
  })
})

router.post("/apply", (req, res) => {
  const { vaccine, dni, lot, vaccination } = req.body
  const date = new Date()
  let isApply
  const today = `Aplicada el ${new Date().toLocaleDateString()} (${lot}).`
  db.query(`SELECT * FROM users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      // Chequeo que exista el DNI
      if (result.length === 0) {
        res.send({ error: true, message: "DNI no registrado en el sistema." })
        // Chequeo que los vacunatorios del paciente y del vacunador coincidan.
      } else if (result[0].vaccination !== vaccination) {
        res.send({
          error: true,
          message: "El paciente no se encuentra registrado en este vacunatorio.",
        })
      } else {
        // Chequeo que la vacuna no figura como aplicada anteriormente.
        db.query(`SELECT * FROM inscriptions WHERE dni = ${dni}`, (error, result) => {
          if (error) {
            res.send(error)
          } else {
            if (result[0].covid.includes("Aplicada") && vaccine === "covid") {
              isApply = true
              res.send({
                error: true,
                message: "La vacuna de COVID-19 ya se encontraba como aplicada anteriormente.",
              })
            } else if (result[0].covid2.includes("Aplicada") && vaccine === "covid2") {
              isApply = true
              res.send({
                error: true,
                message:
                  "La segunda dosis de COVID-19 ya se encontraba como aplicada anteriormente.",
              })
            } else if (!result[0].covid.includes("Aplicada") && vaccine === "covid2") {
              isApply = true
              res.send({
                error: true,
                message: "No se puede aplicar la segunda dosis si la primera no lo esta.",
              })
            } else if (result[0].flu.includes("Aplicada") && vaccine === "flu") {
              isApply = true

              res.send({
                error: true,
                message: "La vacuna para la gripe ya se encontraba como aplicada anteriormente.",
              })
            } else if (result[0].flu2.includes("Aplicada") && vaccine === "flu2") {
              isApply = true
              res.send({
                error: true,
                message:
                  "La segunda dosis para la gripe ya se encontraba como aplicada anteriormente.",
              })
            } else if (result[0].fever.includes("Aplicada") && vaccine === "fever") {
              isApply = true
              res.send({
                error: true,
                message:
                  "La vacuna de la fiebre amarilla ya se encontraba como aplicada anteriormente.",
              })
            }
            // Paso todas las validaciones.
            db.query(`SELECT ${vaccine} FROM inscriptions WHERE dni = ${dni}`, (error, result) => {
              if (error) {
                res.send(error)
              } else {
                actualVaccine = result[0]
              }
            })
            if (!isApply) {
              db.query(
                `UPDATE inscriptions SET ${vaccine} = '${today}' WHERE dni = ${dni}`,
                (error, result) => {
                  if (error) {
                    res.send(error)
                  } else {
                    const checkVaccine = vaccine === "covid2" ? "covid" : vaccine
                    db.query(
                      `UPDATE stock SET ${checkVaccine} = ${checkVaccine} - 1 WHERE vaccination = (?)`,
                      [vaccination],
                      (error, result) => {
                        if (error) {
                          res.send(error)
                        } else {
                          const today = new Date().getDate()
                          if (vaccine === "covid") {
                            const assignedDay = today + 14
                            date.setDate(assignedDay)
                            const turn = `Turno para el ${date.toLocaleDateString()}.`
                            db.query(
                              `UPDATE inscriptions SET covid2 = '${turn}' WHERE dni = ${dni}`,
                              (error, result) => {
                                if (error) {
                                  res.send(error)
                                } else {
                                  console.log(`Segunda dósis de COVID: ${turn}`)
                                }
                              }
                            )
                          } else if (vaccine === "flu") {
                            const assignedDay = today + 365
                            date.setDate(assignedDay)
                            const turn = `Turno para el ${date.toLocaleDateString()}.`

                            db.query(
                              `UPDATE inscriptions SET flu2 = '${turn}' WHERE dni = ${dni}`,
                              (error, result) => {
                                if (error) {
                                  res.send(error)
                                } else {
                                  console.log(`Gripe 2022: ${turn}`)
                                }
                              }
                            )
                          }
                          console.log(
                            `Vacuna '${vaccine}' marcada como aplicada al paciente '${dni}' y stock actualizado correctamente en '${vaccination}'.`
                          )
                          res.send("Vacuna marcada como aplicada exitosamente.")
                        }
                      }
                    )
                  }
                }
              )
            }
          }
        })
      }
    }
  })
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
