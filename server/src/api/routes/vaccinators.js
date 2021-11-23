const router = require("express").Router()
const db = require("../../config/db")


router.post("/login" , (req, res) => {
    const {dni, password} = req.body
    db.query(`SELECT password FROM vaccinators WHERE dni = ${dni}`, (error, result) => {
        if(error) {
            res.send(error)
        } else {
            if (result.length > 0) {
                if (result[0].password === password){
                    res.send("Inicio de sesión exitoso.")
                } else {
                    res.send({
                        error: true,
                        message: "El DNI o la contraseña no son correctos."
                    })
                }
            } else {
                res.send({
                    error: true,
                    message: "El DNI o la contraseña no son correctos."
                })
            }
        }
    })
})

router.get("/name/:dni" , (req, res) => {
    const { dni } = req.params
    db.query(`SELECT name FROM vaccinators WHERE dni = ${dni}`, (error, result) => {
        if(error) {
            res.send(error)
        } else {
            if( result.length === 0) {
                res.send("DNI no existente")
            } else {
                res.send(result[0])
            }
        }
    }) 
})

module.exports = router