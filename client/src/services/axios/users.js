import axios from "axios"
const baseUrl = "http://localhost:8080/api/users"

const getNameByDni = (dni) => {
  return axios.get(`${baseUrl}/${dni}`)
}

const getAllByDni = (dni) => {
  return axios.get(`${baseUrl}/all/${dni}`)
}

const updatePassword = (password, dni) => {
  return axios.post(`${baseUrl}/change-password/${dni}`, {
    password,
  })
}

const checkPassword = (password, dni) => {
  return axios.post(`${baseUrl}/password/${dni}`, {
    password,
  })
}

const getComorbidities = (dni) => {
  return axios.get(`${baseUrl}/comorbidities/${dni}`)
}

const getVaccnation = (dni) => {
  return axios.get(`${baseUrl}/vaccination/${dni}`)
}

const updateVaccination = (dni, vaccination) => {
  return axios.put(`${baseUrl}/update-vaccination/${dni}`, { vaccination })
}

export {
  getNameByDni,
  updatePassword,
  checkPassword,
  getComorbidities,
  getVaccnation,
  updateVaccination,
  getAllByDni,
}
