const router = require("express").Router()
const db = require("../../config/db")

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (error, result) => {
    error ? res.send(error) : res.send(result)
  })
})


router.get("/:dni", (req, res) => {
  const { dni } = req.params
  db.query(`SELECT name FROM users WHERE dni = ${dni}`, (error, result) => {
    if (error) {
      res.send(error)
    } else {
        if (result.length === 0){
          console.log("DNI no existente")
        } else {
          res.send( result[0] )
        }
    }
  })


})

module.exports = router
