import axios from "axios"
const baseUrl = "http://localhost:8080/api/admin"

const addVaccinator = (email, name, lastname, dni, password, vaccination) => {
  return axios.post(`${baseUrl}/add-vaccinator`, {
    email,
    name,
    lastname,
    dni,
    password,
    vaccination,
  })
}

const getStock = (vaccination) => {
  return axios.get(`${baseUrl}/stock/${vaccination}`)
}

const updateTurns = () => {
  return axios.post(`${baseUrl}/update-turns`)
}

const addStock = (vaccination, stock, vaccine) => {
  return axios.put(`${baseUrl}/add-stock/${vaccination}`, {
    vaccine,
    stock,
  })
}

export { addVaccinator, getStock, addStock, updateTurns }
