import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { useState, useEffect } from "react"
import { getLostInscriptions, reasign } from "../../services/axios/inscriptions"

function Turns() {
  const [inscriptions, setInscriptions] = useState([])
  const [covidDate, setCovidDate] = useState("")
  const [fluDate, setFluDate] = useState("")
  const [feverDate, setFeverDate] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [errorHandle, setErrorHandle] = useState("")

  useEffect(() => {
    getLostInscriptions()
      .then((res) => {
        setInscriptions(res.data)
      })
      .catch((e) => {
        console.log(e)
        setError("Algo salió mal...")
      })
  }, [message, errorHandle])

  const getMinDate = () => {
    const todayDate = new Date()
    const UTCDay = todayDate.getDate()
    const day = UTCDay < 10 ? `0${UTCDay}` : UTCDay
    return `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${day}`
  }

  const handleApply = (date, dni, vaccine) => {
    if (date.length === 0) {
      setError("Ingrese una fecha para reasignar el turno.")
      setTimeout(() => {
        setError("")
      }, 5000)
    } else {
      const finalDate = new Date(date)
      finalDate.setDate(finalDate.getDate() + 1)
      reasign(finalDate.toLocaleDateString(), dni, vaccine)
        .then((res) => {
          document.getElementById("date").value = ""
          setMessage(res.data)
          setTimeout(() => {
            setMessage("")
          }, 15000)
          setCovidDate("")
          setFeverDate("")
          setFluDate("")
        })
        .catch((e) => {
          console.log(e)
          setErrorHandle("Algo salió mal...")
        })
    }
  }

  return (
    <>
      <Navbar />
      <Form>
        {inscriptions.length > 0 ? (
          <>
            <h5>Pacientes que no se presentaron a su turno.</h5>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="validation-message">{message}</p>}
            {errorHandle && <p className="error-message">{errorHandle}</p>}
            <ul className="inscriptions-container">
              {inscriptions.map((inscription, index) => (
                <li key={index}>
                  <span className="inscription-title">DNI:</span> {inscription.dni}.
                  <ul className="inscriptions-items">
                    {inscription.covid.includes("No se presento") && (
                      <li>
                        <span className="inscription-title">COVID:</span> {inscription.covid}
                        <p className="form-label-secondary">Reasignar turno.</p>
                        <input
                          id="date"
                          min={`${getMinDate()}`}
                          onChange={(e) => setCovidDate(e.target.value)}
                          className="form-date"
                          type="date"
                        />
                        <div className="inscriptions-buttons-container">
                          <Button
                            handleClick={() => handleApply(covidDate, inscription.dni, "covid")}
                            text="Reasignar"
                            isSmall
                          />
                        </div>
                      </li>
                    )}
                    {inscription.fever.includes("No se presento") && (
                      <li>
                        <span className="inscription-title">Fiebre amarilla:</span>{" "}
                        {inscription.fever}
                        <p className="form-label-secondary">Reasignar turno.</p>
                        <input
                          id="date"
                          min={`${getMinDate()}`}
                          onChange={(e) => setFeverDate(e.target.value)}
                          className="form-date"
                          type="date"
                        />
                        <div className="inscriptions-buttons-container">
                          <Button
                            handleClick={() => handleApply(feverDate, inscription.dni, "fever")}
                            text="Reasignar"
                            isSmall
                          />
                        </div>
                      </li>
                    )}
                    {inscription.flu.includes("No se presento") && (
                      <li>
                        <span className="inscription-title">Gripe:</span> {inscription.flu}
                        <p className="form-label-secondary">Reasignar turno.</p>
                        <input
                          id="date"
                          min={`${getMinDate()}`}
                          onChange={(e) => setFluDate(e.target.value)}
                          className="form-date"
                          type="date"
                        />
                        <div className="inscriptions-buttons-container">
                          <Button
                            handleClick={() => handleApply(fluDate, inscription.dni, "flu")}
                            text="Reasignar"
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
          <h5>No hay pacientes pendientes de reasignación de turno.</h5>
        )}
      </Form>
    </>
  )
}

export default Turns
