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
  const [covid2, setCovid2] = useState("")
  const [fever, setFever] = useState("")
  const [flu, setFlu] = useState("")
  const [flu2, setFlu2] = useState("")
  const [hasCovid, setHasCovid] = useState(false)
  const [hasFlu, setHasFlu] = useState(false)
  const { dni } = useContext(Context)

  useEffect(() => {
    getVaccinesByDni(dni)
      .then((res) => {
        setCovid(res.data.covid)
        if (res.data.covid.includes("Aplicada")) {
          setHasCovid(true)
        }
        setCovid2(res.data.covid2)
        setFever(res.data.fever)
        setFlu(res.data.flu)
        if (res.data.flu.includes("Aplicada")) {
          setHasFlu(true)
        }
        setFlu2(res.data.flu2)
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
        setError("Algo salio mal...")
      })
  }, [message, dni])

  const handleInscription = (vaccine) => {
    inscription(vaccine, dni)
      .then((res) => {
        if (res.data.error) {
          setError(res.data.message)
        } else {
          setMessage(res.data)
          setTimeout(() => {
            setMessage("")
          }, 5000)
        }
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
            <p>{hasCovid ? "Coronavirus (segunda dósis)" : "Coronavirus (primera dósis)"}</p>
            <div className="inscription-container">
              {covid === "No inscripto." ? (
                <Button handleClick={() => handleInscription("covid")} text="Inscribirme" />
              ) : (
                <p className="already-registered">{hasCovid ? covid2 : covid}</p>
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
                <p className="already-registered">{hasFlu ? flu2 : flu}</p>
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
        <div className="history-item">
          <p>
            <span style={{ fontWeight: "bold" }}>COVID (primera dósis):</span> {covid}
          </p>
          {covid.includes("Aplicada") && (
            <span
              onClick={() =>
                window.open(`http://localhost:3000/certificate?vaccine=covid&&dni=${dni}`)
              }
              className="btn-certificate"
            >
              Ver vertificado
            </span>
          )}
        </div>

        {hasCovid && (
          <div className="history-item">
            <p>
              <span style={{ fontWeight: "bold" }}>COVID (segunda dósis):</span> {covid2}
            </p>
            {covid2.includes("Aplicada") && (
              <span
                onClick={() =>
                  window.open(`http://localhost:3000/certificate?vaccine=covid2&&dni=${dni}`)
                }
                className="btn-certificate"
              >
                Ver vertificado
              </span>
            )}
          </div>
        )}

        <div className="history-item">
          <p>
            <span style={{ fontWeight: "bold" }}>Fiebre amarilla:</span> {fever}
          </p>
          {fever.includes("Aplicada") && (
            <span
              onClick={() =>
                window.open(`http://localhost:3000/certificate?vaccine=fever&&dni=${dni}`)
              }
              className="btn-certificate"
            >
              Ver vertificado
            </span>
          )}
        </div>

        <div className="history-item">
          <p>
            <span style={{ fontWeight: "bold" }}>Gripe (2021):</span> {flu}
          </p>
          {flu.includes("Aplicada") && (
            <span
              onClick={() =>
                window.open(`http://localhost:3000/certificate?vaccine=flu&&dni=${dni}`)
              }
              className="btn-certificate"
            >
              Ver vertificado
            </span>
          )}
        </div>

        {hasFlu && (
          <div className="history-item">
            <p>
              <span style={{ fontWeight: "bold" }}>Gripe (2022):</span> {flu2}
            </p>
            {flu2.includes("Aplicada") && (
              <span
                onClick={() =>
                  window.open(`http://localhost:3000/certificate?vaccine=flu2&&dni=${dni}`)
                }
                className="btn-certificate"
              >
                Ver vertificado
              </span>
            )}
          </div>
        )}
      </Form>
    </>
  )
}

export default Vaccines
