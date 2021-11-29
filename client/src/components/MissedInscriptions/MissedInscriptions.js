import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { useState, useEffect } from "react"
import { getInscriptions, lostTurn } from "../../services/axios/inscriptions"

function MissedInscriptions() {
  const [inscriptions, setInscriptions] = useState([])
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [errorHandle, setErrorHandle] = useState("")
  const todayDate = new Date().toLocaleDateString()

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
        {error && <p className="error-message">{error}</p>}
        {inscriptions.length > 0 ? (
          <>
            <h5>Pacientes que no se presentaron a su turno.</h5>
            {message && <p className="validation-message">{message}</p>}
            {errorHandle && <p className="error-message">{errorHandle}</p>}
            <ul className="inscriptions-container">
              {inscriptions.map(
                (inscription, index) =>
                  (inscription.covid.includes("Turno") ||
                    inscription.flu.includes("Turno") ||
                    inscription.fever.includes("Turno")) && (
                    <li key={index}>
                      <span className="inscription-title">DNI:</span> {inscription.dni}.
                      <ul className="inscriptions-items">
                        {inscription.covid.includes("Turno") &&
                          inscription.covid.slice(14, 24) < todayDate && (
                            <li>
                              <span className="inscription-title">COVID:</span> {inscription.covid}
                              <div className="inscriptions-buttons-container">
                                <Button
                                  handleClick={() => handleLost(inscription.dni, "covid")}
                                  text="No se presento"
                                  isSmall
                                />
                              </div>
                            </li>
                          )}
                        {inscription.fever.includes("Turno") &&
                          inscription.fever.slice(14, 24) < todayDate && (
                            <li>
                              <span className="inscription-title">Fiebre amarilla:</span>{" "}
                              {inscription.fever}
                              <div className="inscriptions-buttons-container">
                                <Button
                                  handleClick={() => handleLost(inscription.dni, "fever")}
                                  text="No se presento"
                                  isSmall
                                />
                              </div>
                            </li>
                          )}
                        {inscription.flu.includes("Turno") &&
                          inscription.flu.slice(14, 24) < todayDate && (
                            <li>
                              <span className="inscription-title">Gripe:</span> {inscription.flu}
                              <div className="inscriptions-buttons-container">
                                <Button
                                  handleClick={() => handleLost(inscription.dni, "flu")}
                                  text="No se presento"
                                  isSmall
                                />
                              </div>
                            </li>
                          )}
                      </ul>
                    </li>
                  )
              )}
            </ul>
          </>
        ) : (
          <h5>No hay pacientes que no se presentaron a su turno.</h5>
        )}
      </Form>
    </>
  )
}

export default MissedInscriptions
