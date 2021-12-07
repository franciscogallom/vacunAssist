import "./certificate.css"
import { useLocation } from "react-router-dom"
import { getAllByDni } from "../../services/axios/users"
import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { getVaccinesByDni } from "../../services/axios/inscriptions"
import logo from "../../assets/images/logo.png"

export default function Certificate() {
  const [data, setData] = useState({})
  const [vaccineMessage, setVaccineMessage] = useState("")

  const useQuery = () => new URLSearchParams(useLocation().search)
  const vaccine = useQuery().get("vaccine")
  const dni = useQuery().get("dni")
  let dateOfBirth = new Date(data.date_of_birth)
  dateOfBirth.setDate(dateOfBirth.getDate() + 1)
  dateOfBirth = dateOfBirth.toLocaleDateString()

  useEffect(() => {
    getAllByDni(dni)
      .then((res) => {
        setData(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
    getVaccinesByDni(dni)
      .then((res) => {
        if (vaccine === "covid") {
          setVaccineMessage(`COVID-19 (primera dósis): ${res.data.covid}`)
        } else if (vaccine === "covid2") {
          setVaccineMessage(
            `COVID-19 (primera dósis): ${res.data.covid} y COVID-19 (segunda dósis): ${res.data.covid2}`
          )
        } else if (vaccine === "fever") {
          setVaccineMessage(`FIEBRE AMARILLA: ${res.data.fever}`)
        } else if (vaccine === "flu") {
          setVaccineMessage(`GRIPE (2021): ${res.data.flu}`)
        } else {
          setVaccineMessage(`GRIPE (2022): ${res.data.flu2}`)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }, [dni, vaccine])

  return (
    <div className="certificate-container">
      <h1>Certificado de vacunación</h1>
      <p>
        Se certifica que el paciente{" "}
        <span>
          {data.name} {data.lastname}
        </span>
        , con fecha de nacimiento <span>{dateOfBirth}</span>, de DNI <span>{data.dni}</span>,
        registra en nuestro sistema el siguiente estado para la vacuna correspondiente a{" "}
        <span>{vaccineMessage}</span>
      </p>
      <img
        className="certificate-logo"
        onClick={() => undefined}
        src={logo}
        alt="Logo de VacunAssist"
      />
    </div>
  )
}
