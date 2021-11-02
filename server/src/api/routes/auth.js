const router = require("express").Router()
const db = require("../../config/db")

router.post("/signup", (req, res) => {
  const { email, name, lastname, dni, password, vaccination, date_of_birth } = req.body
  const confirmed = false
  const createdAt = new Date().toLocaleString()

  db.query(
    `SELECT email FROM users WHERE email=${email}`, (error, result) => {
      if (error) {
        res.send({ error })
      } else {
        if ( result.lenght > 0 ) {
          res.send("Email ya está en uso.")
        } else {
          db.query( 
            `SELECT dni FROM users WHERE dni=${dni}`, (error, result) => {
              if (error) {
                res.send({ error })
              } else if (result.lenght > 0){
                  res.send("DNI ya está uso.") 
              } else {
                db.query(
                  "INSERT INTO users (email, name, lastname, dni, password, vaccination, date_of_birth, confirmed, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                  [email, name, lastname, dni, password, vaccination, date_of_birth, confirmed, createdAt],
                  (err) => {
                    if (err) {
                      res.send({ err })
                    } else {
                      res.send("Usuario añadido.")
                    }
                  }
                ) 
              }
            }
          )
        }
      }
    }
  )

})

router.post("/signup/comorbidities", (req, res) => {
  const { dni, com1, com2, com3, com4, com5, com6, com7, com8, com9, com10, com11, com12 } = req.body
  db.query("UPDATE users SET com1 = ?,  com2 = ?, com3 = ?, com4 = ?, com5 = ?, com6 = ?, com7 = ?, com8 = ?, com9 = ?, com10 = ?, com11 = ?, com12 = ? WHERE dni = ? ", 
  [com1, com2, com3, com4, com5, com6, com7, com8, com9 , com10, com11, com12, dni], 
  (err) => {
    if (err) {
      res.send({ err })
    }else{
      res.send("Comorbilidades añadidas.")
    }
  })
})

router.post("/login", (req, res) => {
  const { dni, password } = req.body
  db.query(`SELECT password, confirmed FROM users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      if (result[0].password === password && result[0].confirmed) {
        res.send("Inicio de sesión exitoso")
      } else {
        res.send("La contraseña no coincide o el usuario no esta confirmado")
      }
    }
  })
})

router.post("/verification/:dni", (req, res) => {
  const {dni} = req.params
  db.query(`UPDATE users SET confirmed = true WHERE dni = ${dni}`, (error,result) => {
    if (error) {
      res.send(error)
    }else if (result.affectedRows === 0) {
      res.send("No existe el DNI.")
    } else {
      res.send("Confirmación realizada.")
    }
  })
})



module.exports = router
