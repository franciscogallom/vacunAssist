import "./inscriptions.css"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import { useState, useEffect } from "react"
import { getInscriptions } from "../../services/axios/inscriptions"

function Inscriptions() {
  const [inscriptions, setInscriptions] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    getInscriptions()
      .then((res) => {
        setInscriptions(res.data)
      })
      .catch((e) => {
        console.log(e)
        setError("Algo salio mal...")
      })
  })

  return (
    <>
      <Navbar />
      <Form>
        <h5>Pacientes registrados en la aplicación.</h5>

        <ul className="inscriptions-container">
          {inscriptions.map((inscription, index) => {
            let covidMessage
            let feverMessage
            let fluMessage

            if (inscription.covid.length > 0) {
              covidMessage =
                inscription.covid === "waiting"
                  ? "En cola de espera."
                  : `Turno para el ${inscription.covid}.`
            } else {
              covidMessage = "No inscripto."
            }

            if (inscription.fever.length > 0) {
              feverMessage =
                inscription.fever === "waiting"
                  ? "En cola de espera."
                  : `Turno para el ${inscription.fever}.`
            } else {
              feverMessage = "No inscripto."
            }

            if (inscription.flu.length > 0) {
              fluMessage =
                inscription.flu === "waiting"
                  ? "En cola de espera."
                  : `Turno para el ${inscription.flu}.`
            } else {
              fluMessage = "No inscripto."
            }

            return (
              <li key={index}>
                <span className="inscription-title">DNI:</span> {inscription.dni}.
                <ul className="inscriptions-items">
                  <li>
                    <span className="inscription-title">COVID:</span> {covidMessage}
                  </li>
                  <li>
                    <span className="inscription-title">Fiebre amarilla:</span> {feverMessage}
                  </li>
                  <li>
                    <span className="inscription-title">Gripe:</span> {fluMessage}
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>

        {error.length > 0 && (
          <ul className="form-errors">
            <li>{error}</li>
          </ul>
        )}
      </Form>
    </>
  )
}

export default Inscriptions
