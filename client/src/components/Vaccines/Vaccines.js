import "./vaccines.css"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { useContext } from "react"
import { inscription } from "../../services/axios/vaccines"
import Context from "../../context/context"
import { useState, useEffect } from "react"
import { getVaccinesByDni } from "../../services/axios/users"

function Vaccines() {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [covid, setCovid] = useState(false)
  const [fever, setFever] = useState(false)
  const [flu, setFlu] = useState(false)
  const { dni } = useContext(Context)

  useEffect(() => {
    getVaccinesByDni(dni)
      .then((res) => {
        setCovid(res.data.covid)
        setFever(res.data.fever)
        setFlu(res.data.flu)
        console.log({ covid, fever, flu })
      })
      .catch((error) => {
        console.log(error)
        setError("Algo salio mal...")
      })
  }, [covid, dni, fever, flu])

  const handleInscription = (vaccine) => {
    inscription(vaccine, dni)
      .then((res) => {
        setMessage(res.data)
        if (vaccine === "covid") {
          setCovid(true)
        } else if (vaccine === "fever") {
          setFever(true)
        } else {
          setFlu(true)
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
            <p>Coronavirus</p>
            {covid ? (
              <p className="alreadyRegistered">Ya estas inscripto!</p>
            ) : (
              <Button handleClick={() => handleInscription("covid")} text="Inscribirme" />
            )}
          </div>
          <div className="vaccine">
            <p>Fiebre amarilla</p>
            {fever ? (
              <p className="alreadyRegistered">Ya estas inscripto!</p>
            ) : (
              <Button handleClick={() => handleInscription("fever")} text="Inscribirme" />
            )}
          </div>
          <div className="vaccine">
            <p>Gripe</p>
            {flu ? (
              <p className="alreadyRegistered">Ya estas inscripto!</p>
            ) : (
              <Button handleClick={() => handleInscription("flu")} text="Inscribirme" />
            )}
          </div>
        </div>

        {error.length > 0 && (
          <ul className="form-errors">
            <li>{error}</li>
          </ul>
        )}

        {message.length > 0 && <p className="validation-message">{message}</p>}
      </Form>
    </>
  )
}

export default Vaccines
