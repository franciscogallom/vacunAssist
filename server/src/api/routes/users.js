const router = require("express").Router()
const db = require("../../config/db")

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (error, result) => {
    {
      error ? res.send(error) : res.send(result)
    }
  })
})

module.exports = router
