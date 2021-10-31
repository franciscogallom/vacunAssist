const mysql = require("mysql")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "vacunassist",
})

module.exports = db
