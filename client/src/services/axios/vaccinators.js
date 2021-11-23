import axios from "axios"
const baseUrl = "http://localhost:8080/api/vaccinators"

const loginAsVaccinator = (dni, password) => {
  return axios.post(`${baseUrl}/login`, {
    dni,
    password,
  })
}

const getVaccinatorNameByDni = (dni) => {
  return axios.get(`${baseUrl}/name/${dni}`)
}

export { loginAsVaccinator, getVaccinatorNameByDni }
