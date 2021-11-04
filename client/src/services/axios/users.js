import axios from "axios"
const baseUrl = "http://localhost:8080/api/users"

const getNameByDni = (dni) => {
    return axios.get(`${baseUrl}/${dni}`)
}
export { getNameByDni }