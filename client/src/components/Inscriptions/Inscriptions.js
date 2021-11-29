import "./inscriptions.css"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { useState, useEffect } from "react"
import { getInscriptionsForToday, applyVaccine } from "../../services/axios/inscriptions"

function Inscriptions() {
  const [inscriptions, setInscriptions] = useState([])
  const [dniWithoutInscription, setDniWithoutInscription] = useState("")
  const [appliedVaccine, setAppliedVaccine] = useState("covid")
  const [error, setError] = useState("")
  const [error2, setError2] = useState("")
  const [message, setMessage] = useState("")
  const [message2, setMessage2] = useState("")
  const [errorHandle, setErrorHandle] = useState("")

  const today = new Date().toLocaleDateString()

  useEffect(() => {
    getInscriptionsForToday()
      .then((res) => {
        setInscriptions(res.data)
      })
      .catch((e) => {
        console.log(e)
        setError("Algo salió mal...")
      })
  }, [message, errorHandle])

  const handleApply = (dni, vaccine, isSecondForm) => {
    applyVaccine(dni, vaccine)
      .then((res) => {
        if (isSecondForm) {
          document.getElementById("dni").value = ""
          document.getElementById("vaccine").value = "covid"
          setMessage2(res.data)
          setTimeout(() => {
            setMessage2("")
          }, 5000)
        } else {
          setMessage(res.data)
          setTimeout(() => {
            setMessage("")
          }, 5000)
        }
      })
      .catch((e) => {
        console.log(e)
        if (isSecondForm) {
          setError2("Algo salió mal...")
        } else {
          setErrorHandle("Algo salió mal...")
        }
      })
  }

  return (
    <>
      <Navbar />
      <Form>
        {error && <p className="error-message">{error}</p>}
        {inscriptions.length > 0 ? (
          <>
            <h5>Pacientes con turno para hoy {new Date().toLocaleDateString()}.</h5>
            {message && <p className="validation-message">{message}</p>}
            {errorHandle && <p className="error-message">{errorHandle}</p>}
            <ul className="inscriptions-container">
              {inscriptions.map((inscription, index) => (
                <li key={index}>
                  <span className="inscription-title">DNI:</span> {inscription.dni}.
                  <ul className="inscriptions-items">
                    {inscription.covid.includes(`Turno para el ${today}`) && (
                      <li>
                        <span className="inscription-title">COVID:</span> {inscription.covid}
                        <div className="inscriptions-buttons-container">
                          <Button
                            handleClick={() => handleApply(inscription.dni, "covid")}
                            text="Aplicada"
                            isSmall
                          />
                        </div>
                      </li>
                    )}
                    {inscription.fever.includes(`Turno para el ${today}`) && (
                      <li>
                        <span className="inscription-title">Fiebre amarilla:</span>{" "}
                        {inscription.fever}
                        <div className="inscriptions-buttons-container">
                          <Button
                            handleClick={() => handleApply(inscription.dni, "fever")}
                            text="Aplicada"
                            isSmall
                          />
                        </div>
                      </li>
                    )}
                    {inscription.flu.includes(`Turno para el ${today}`) && (
                      <li>
                        <span className="inscription-title">Gripe:</span> {inscription.flu}
                        <div className="inscriptions-buttons-container">
                          <Button
                            handleClick={() => handleApply(inscription.dni, "flu")}
                            text="Aplicada"
                            isSmall
                          />
                        </div>
                      </li>
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h5>No hay pacientes con turno para hoy {new Date().toLocaleDateString()}.</h5>
        )}
      </Form>
      <Form>
        <h5>Aplicar vacuna a paciente sin turno.</h5>
        <input
          onChange={(e) => setDniWithoutInscription(e.target.value)}
          placeholder="DNI del paciente"
          type="number"
          id="dni"
        />
        <p className="form-label">Vacuna aplicada</p>
        <select
          style={{ marginBottom: "1em" }}
          id="vaccine"
          onChange={(e) => setAppliedVaccine(e.target.value)}
          className="select"
        >
          <option value="covid">COVID-19</option>
          <option value="flu">Gripe</option>
          <option value="fever">Fiebre amarilla</option>
        </select>
        <Button
          handleClick={() => handleApply(dniWithoutInscription, appliedVaccine, true)}
          text="Aplicar"
        />
        {message2 && <p className="validation-message">{message2}</p>}
        {error2 && <p className="error-message">{error2}</p>}
      </Form>
    </>
  )
}

export default Inscriptions
