import axios from "axios"

const baseUrl = "http://localhost:8080/api/auth"

const updateComorbidities = ({
  dni,
  com1,
  com2,
  com3,
  com4,
  com5,
  com6,
  com7,
  com8,
  com9,
  com10,
  com11,
  com12,
}) =>
  axios.post(`${baseUrl}/signup/comorbidities`, {
    dni,
    com1,
    com2,
    com3,
    com4,
    com5,
    com6,
    com7,
    com8,
    com9,
    com10,
    com11,
    com12,
  })

const login = (dni, password) => {
  return axios.post(`${baseUrl}/login`, {
    dni,
    password,
  })
}

const signup = (email, name, lastname, dni, password, vaccination, dateOfBirth) => {
  return axios.post(`${baseUrl}/signup`, {
    email,
    name,
    lastname,
    dni,
    password,
    vaccination,
    date_of_birth: dateOfBirth,
  })
}

const sendEmailByDni = (dni) => {
  return axios.post(`${baseUrl}/sendEmail/${dni}`, {
    verificationCode: localStorage.getItem("verificationCode"),
  })
}

const updateConfirmed = (dni) => {
  return axios.post(`${baseUrl}/verification/${dni}`)
}

export { updateComorbidities, login, signup, sendEmailByDni, updateConfirmed }
