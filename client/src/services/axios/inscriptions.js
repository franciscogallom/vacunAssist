import axios from "axios"
const baseUrl = "http://localhost:8080/api/inscriptions"

const inscription = (vaccine, dni) => {
  return axios.post(`${baseUrl}/${vaccine}/${dni}`)
}

const getInscriptions = () => {
  return axios.get(`${baseUrl}/`)
}

const getVaccinesByDni = (dni) => {
  return axios.get(`${baseUrl}/vaccines/${dni}`)
}

const applyVaccine = (dni, vaccine) => {
  return axios.post(`${baseUrl}/apply`, { vaccine, dni })
}

const lostTurn = (dni, vaccine) => {
  return axios.post(`${baseUrl}/lost-turn`, { vaccine, dni })
}

export { inscription, getVaccinesByDni, getInscriptions, applyVaccine, lostTurn }
