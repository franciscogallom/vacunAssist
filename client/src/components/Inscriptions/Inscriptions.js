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
          {inscriptions.map((inscription, index) => (
            <li key={index}>
              <span className="inscription-title">DNI:</span> {inscription.dni}.
              <ul className="inscriptions-items">
                <li>
                  <span className="inscription-title">COVID:</span> {inscription.covid}
                </li>
                <li>
                  <span className="inscription-title">Fiebre amarilla:</span> {inscription.fever}
                </li>
                <li>
                  <span className="inscription-title">Gripe:</span> {inscription.flu}
                </li>
              </ul>
            </li>
          ))}
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
