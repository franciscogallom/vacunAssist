import "./vaccines.css"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { useContext } from "react"
import { inscription } from "../../services/axios/inscriptions"
import Context from "../../context/context"
import { useState, useEffect } from "react"
import { getVaccinesByDni } from "../../services/axios/inscriptions"

function Vaccines() {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [covid, setCovid] = useState("")
  const [fever, setFever] = useState("")
  const [flu, setFlu] = useState("")
  const { dni } = useContext(Context)

  useEffect(() => {
    getVaccinesByDni(dni)
      .then((res) => {
        setCovid(res.data.covid)
        setFever(res.data.fever)
        setFlu(res.data.flu)
      })
      .catch((error) => {
        console.log(error)
        setError("Algo salio mal...")
      })
  }, [message, dni])

  const handleInscription = (vaccine) => {
    inscription(vaccine, dni)
      .then((res) => {
        setMessage(res.data)
        setTimeout(() => {
          setMessage("")
        }, 5000)
      })
      .catch(() => {
        setError("Algo salio mal, vuelve a intentarlo.")
      })
  }

  return (
    <>
      <Navbar />
      <Form>
        <h5>Inscripción a vacunas.</h5>
        <div className="vaccines-container">
          <div className="vaccine">
            <p>Coronavirus</p>
            <div className="inscription-container">
              {covid === "No inscripto." ? (
                <Button handleClick={() => handleInscription("covid")} text="Inscribirme" />
              ) : (
                <p className="already-registered">{covid}</p>
              )}
            </div>
          </div>
          <div className="vaccine">
            <p>Fiebre amarilla</p>
            <div className="inscription-container">
              {fever === "No inscripto." ? (
                <Button handleClick={() => handleInscription("fever")} text="Inscribirme" />
              ) : (
                <p className="already-registered">{fever}</p>
              )}
            </div>
          </div>
          <div className="vaccine">
            <p>Gripe</p>
            <div className="inscription-container">
              {flu === "No inscripto." ? (
                <Button handleClick={() => handleInscription("flu")} text="Inscribirme" />
              ) : (
                <p className="already-registered">{flu}</p>
              )}
            </div>
          </div>
        </div>

        {(covid === "No se presento." ||
          fever === "No se presento." ||
          flu === "No se presento.") && (
          <p style={{ fontSize: ".6em", fontWeight: "bold" }}>
            Si usted no se presento a su turno, debe esperar a que se le asigne uno nuevo.
          </p>
        )}

        {error.length > 0 && (
          <ul className="form-errors">
            <li>{error}</li>
          </ul>
        )}

        {message.length > 0 && <p className="validation-message">{message}</p>}
      </Form>

      <Form>
        <h5>Historial.</h5>
        <p>
          <span style={{ fontWeight: "bold" }}>COVID:</span> {covid}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Fiebre amarilla:</span> {fever}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Gripe:</span> {flu}
        </p>
      </Form>
    </>
  )
}

export default Vaccines
