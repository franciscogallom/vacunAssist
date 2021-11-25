import "./inscriptions.css"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { useState, useEffect } from "react"
import { getInscriptions, applyVaccine, lostTurn } from "../../services/axios/inscriptions"

function Inscriptions() {
  const [inscriptions, setInscriptions] = useState([])
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [errorHandle, setErrorHandle] = useState("")

  useEffect(() => {
    getInscriptions()
      .then((res) => {
        setInscriptions(res.data)
      })
      .catch((e) => {
        console.log(e)
        setError("Algo salió mal...")
      })
  }, [message, errorHandle])

  const handleApply = (dni, vaccine) => {
    applyVaccine(dni, vaccine)
      .then((res) => {
        setMessage(res.data)
        setTimeout(() => {
          setMessage("")
        }, 5000)
      })
      .catch((e) => {
        console.log(e)
        setErrorHandle("Algo salió mal...")
      })
  }

  const handleLost = (dni, vaccine) => {
    lostTurn(dni, vaccine)
      .then((res) => {
        setMessage(res.data)
        setTimeout(() => {
          setMessage("")
        }, 5000)
      })
      .catch((e) => {
        console.log(e)
        setErrorHandle("Algo salió mal...")
      })
  }

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
                  {inscription.covid !== "No se presento." &&
                    inscription.covid !== "Aplicada." &&
                    inscription.covid !== "No inscripto." && (
                      <div className="inscriptions-buttons-container">
                        <Button
                          handleClick={() => handleApply(inscription.dni, "covid")}
                          text="Aplicada"
                          isSmall
                        />
                        <Button
                          handleClick={() => handleLost(inscription.dni, "covid")}
                          text="No se presento"
                          secondary
                          isSmall
                        />
                      </div>
                    )}
                </li>
                <li>
                  <span className="inscription-title">Fiebre amarilla:</span> {inscription.fever}
                  {inscription.fever !== "No se presento." &&
                    inscription.fever !== "Aplicada." &&
                    inscription.fever !== "No inscripto." && (
                      <div className="inscriptions-buttons-container">
                        <Button
                          handleClick={() => handleApply(inscription.dni, "fever")}
                          text="Aplicada"
                          isSmall
                        />
                        <Button
                          handleClick={() => handleLost(inscription.dni, "fever")}
                          text="No se presento"
                          secondary
                          isSmall
                        />
                      </div>
                    )}
                </li>
                <li>
                  <span className="inscription-title">Gripe:</span> {inscription.flu}
                  {inscription.flu !== "No se presento." &&
                    inscription.flu !== "Aplicada." &&
                    inscription.flu !== "No inscripto." && (
                      <div className="inscriptions-buttons-container">
                        <Button
                          handleClick={() => handleApply(inscription.dni, "flu")}
                          text="Aplicada"
                          isSmall
                        />
                        <Button
                          handleClick={() => handleLost(inscription.dni, "flu")}
                          text="No se presento"
                          secondary
                          isSmall
                        />
                      </div>
                    )}
                </li>
              </ul>
              {message && <p className="validation-message">{message}</p>}
              {errorHandle && <p className="error-message">{errorHandle}</p>}
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
