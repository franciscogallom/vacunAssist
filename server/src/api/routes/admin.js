const router = require("express").Router()
const db = require("../../config/db")

router.post("/add-vaccinator" , (req, res) => {
    const {email, name, lastname, dni, password } = req.body
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
                        "INSERT INTO vaccinators (email, name, lastname, dni, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
                        [
                            email,
                            name,
                            lastname,
                            dni,
                            password,
                            createdAt
                        ],
                        (err) => {
                            if(err) {
                                res.send({ err })
                            } else {
                                res.send("Vacunador añadido")
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