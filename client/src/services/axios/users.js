import axios from "axios"
const baseUrl = "http://localhost:8080/api/users"

const getNameByDni = (dni) => {
  return axios.get(`${baseUrl}/${dni}`)
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

export { getNameByDni, updatePassword, checkPassword, getComorbidities }
