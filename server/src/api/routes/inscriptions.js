const router = require("express").Router()
const db = require("../../config/db")


router.post('/:vaccine/:dni' , (req,res) => {
    const {vaccine, dni} = req.params
    const date = new Date()
    db.query(`SELECT date_of_birth, risk_factor from users WHERE dni = ${dni}`, (error, result) => {
        if(error){
            res.send(error)
        } else if ( result.length === 0 ){
            console.log("DNI no existente")
        } else { 
            const age = date.getFullYear() - result[0].date_of_birth.slice(0,4)   
            //Casos para el covid-19
            if ( vaccine === "covid"){
                if ( age >= 60 ){
                db.query(`UPDATE users SET covid = true WHERE dni = ${dni}`, (error, result) => {
                    if(error){
                        res.send(error)
                    } else if (result.length === 0){
                        res.send("DNI no existente")
                    } else {
                        res.send('Prioridad confirmada, turno en 7 dias')
                    }
                })               
                } else if ((age > 18) && (age < 60) && (result[0].risk_factor) ) {
                    db.query(`UPDATE users SET covid = true WHERE dni = ${dni}`, (error, result) => {
                        if(error){
                            res.send(error)
                        } else if (result.length === 0) {
                            res.send("DNI no existente")
                        } else {
                            res.send("Prioridad confirmada, turno en 7 dias.")
                        }
                    })
                } else if ( age < 18 ){
                    res.send("Aun no se puede inscribir")
                } else {
                 res.send("En cola de espera para asignacion del turno.")
                }
            }  
            //Casos para la fiebre amarilla
            else if ( vaccine === "fever" ){
                if ( age < 60) {
                    db.query(`UPDATE users SET fever = true WHERE dni = ${dni}`, (error, result) => {
                        if(error){
                            res.send(error)
                        } else if (result.length === 0){
                            res.send("DNI no existente")
                        } else {
                        res.send("En espera a que se le asigne un turno.")
                        }
                    })
                } else {
                    res.send("No puede inscribirse a la vacuna por ser mayor a 60 años.")
                }
            //Casos para la gripe   
            } else if ( vaccine === "flu"){
                if ( age >= 60){
                    db.query(`UPDATE users SET flu = true WHERE dni = ${dni}`, (error, result) => {
                        if(error){
                            res.send(error)
                        } else if (result.length === 0){
                            res.send("DNI no existente")
                        } else {
                            res.send("Turno en los proximos 3 meses")
                        } 
                    })
                } else {
                    db.query(`UPDATE users SET flu = true WHERE dni = ${dni}`, (error,result) => {
                        if(error){
                            res.send(error)
                        } else {
                            res.send("Turno en los proximos 6 meses")
                        }
                    })
                }
            }
        }       
    })
})  



module.exports = router