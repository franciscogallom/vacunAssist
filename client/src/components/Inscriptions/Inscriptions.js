import "./inscriptions.css"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { useState, useEffect, useContext } from "react"
import { getInscriptionsForToday, applyVaccine } from "../../services/axios/inscriptions"
import { getVaccination } from "../../services/axios/vaccinators"
import Context from "../../context/context"

function Inscriptions() {
  const [inscriptions, setInscriptions] = useState([])
  const [dniWithoutInscription, setDniWithoutInscription] = useState("")
  const [appliedVaccine, setAppliedVaccine] = useState("covid")
  const [error, setError] = useState("")
  const [error2, setError2] = useState("")
  const [message, setMessage] = useState("")
  const [message2, setMessage2] = useState("")
  const [errorHandle, setErrorHandle] = useState("")
  const [lot, setLot] = useState("")
  const [vaccination, setVaccination] = useState("")

  const { dni } = useContext(Context)

  const today = `Turno para el ${new Date().toLocaleDateString()}.`

  useEffect(() => {
    getVaccination(dni)
      .then((res) => {
        setVaccination(res.data)
        getInscriptionsForToday(res.data)
          .then((res) => {
            setInscriptions(res.data)
          })
          .catch((e) => {
            console.log(e)
            setError("Algo salió mal...")
          })
      })
      .catch((e) => {
        console.log(e)
        setError("Algo salió mal...")
      })
  }, [message, errorHandle, dni])

  const handleApply = (dni, vaccine, isSecondForm) => {
    if (lot.length === 0) {
      if (isSecondForm) {
        if (dniWithoutInscription.length === 0) {
          setError2("Ingrese un DNI, fabricante y lote de vacuna.")
        } else {
          setError2("Ingrese un fabricante y lote de vacuna.")
        }
        setTimeout(() => {
          setError2("")
        }, 5000)
      } else {
        setErrorHandle("Ingrese un fabricante y lote de vacuna.")
        setTimeout(() => {
          setErrorHandle("")
        }, 5000)
      }
    } else {
      if (isSecondForm && dniWithoutInscription.length === 0) {
        setError2("Ingrese un DNI.")
        setTimeout(() => {
          setError2("")
        }, 5000)
      } else {
        applyVaccine(dni, vaccine, lot, vaccination)
          .then((res) => {
            if (isSecondForm) {
              if (res.data.error) {
                setError2(res.data.message)
                setTimeout(() => {
                  setError2("")
                }, 5000)
              } else {
                document.getElementById("dni").value = ""
                document.getElementById("vaccine").value = "covid"
                document.getElementById("lot").value = ""
                setLot("")
                setMessage2(res.data)
                setTimeout(() => {
                  setMessage2("")
                }, 5000)
              }
            } else {
              document.getElementById("lot").value = ""
              setLot("")
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
    }
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
                    {inscription.covid.includes(today) && (
                      <li>
                        <span className="inscription-title">COVID (primera dósis):</span>{" "}
                        {inscription.covid}
                        <div className="inscriptions-buttons-container">
                          <input
                            id="lot"
                            style={{ marginTop: 0 }}
                            onChange={(e) => setLot(e.target.value)}
                            placeholder="Fabricante y lote de vacuna"
                            type="text"
                          />
                          <Button
                            handleClick={() => handleApply(inscription.dni, "covid")}
                            text="Aplicada"
                            isSmall
                          />
                        </div>
                      </li>
                    )}
                    {inscription.covid2.includes(today) && (
                      <li>
                        <span className="inscription-title">COVID (segunda dósis):</span>{" "}
                        {inscription.covid2}
                        <div className="inscriptions-buttons-container">
                          <input
                            id="lot"
                            style={{ marginTop: 0 }}
                            onChange={(e) => setLot(e.target.value)}
                            placeholder="Fabricante y lote de vacuna"
                            type="text"
                          />
                          <Button
                            handleClick={() => handleApply(inscription.dni, "covid2")}
                            text="Aplicada"
                            isSmall
                          />
                        </div>
                      </li>
                    )}
                    {inscription.fever.includes(today) && (
                      <li>
                        <span className="inscription-title">Fiebre amarilla:</span>{" "}
                        {inscription.fever}
                        <div className="inscriptions-buttons-container">
                          <input
                            id="lot"
                            style={{ marginTop: 0 }}
                            onChange={(e) => setLot(e.target.value)}
                            placeholder="Fabricante y lote de vacuna"
                            type="text"
                          />
                          <Button
                            handleClick={() => handleApply(inscription.dni, "fever")}
                            text="Aplicada"
                            isSmall
                          />
                        </div>
                      </li>
                    )}
                    {inscription.flu.includes(today) && (
                      <li>
                        <span className="inscription-title">Gripe (2021):</span> {inscription.flu}
                        <div className="inscriptions-buttons-container">
                          <input
                            id="lot"
                            style={{ marginTop: 0 }}
                            onChange={(e) => setLot(e.target.value)}
                            placeholder="Fabricante y lote de vacuna"
                            type="text"
                          />
                          <Button
                            handleClick={() => handleApply(inscription.dni, "flu")}
                            text="Aplicada"
                            isSmall
                          />
                        </div>
                      </li>
                    )}
                    {inscription.flu2.includes(today) && (
                      <li>
                        <span className="inscription-title">Gripe (2022):</span> {inscription.flu2}
                        <div className="inscriptions-buttons-container">
                          <input
                            id="lot"
                            style={{ marginTop: 0 }}
                            onChange={(e) => setLot(e.target.value)}
                            placeholder="Fabricante y lote de vacuna"
                            type="text"
                          />
                          <Button
                            handleClick={() => handleApply(inscription.dni, "flu2")}
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
          <>
            <h5>No hay pacientes con turno para hoy {new Date().toLocaleDateString()}.</h5>
            {message && <p className="validation-message">{message}</p>}
          </>
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
        <input
          id="lot"
          style={{ marginTop: 0 }}
          onChange={(e) => setLot(e.target.value)}
          placeholder="Fabricante y lote de vacuna"
          type="text"
        />
        <p className="form-label">Vacuna aplicada</p>
        <select
          style={{ marginBottom: "1em" }}
          id="vaccine"
          onChange={(e) => setAppliedVaccine(e.target.value)}
          className="select"
        >
          <option value="covid">COVID-19 (primera dósis)</option>
          <option value="covid2">COVID-19 (segunda dósis)</option>
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
