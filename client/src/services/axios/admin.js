import axios from "axios"
const baseUrl = "http://localhost:8080/api/admin"

const addVaccinator = (email, name, lastname, dni, password) => {
  return axios.post(`${baseUrl}/add-vaccinator`, {
    email,
    name,
    lastname,
    dni,
    password,
  })
}

export { addVaccinator }