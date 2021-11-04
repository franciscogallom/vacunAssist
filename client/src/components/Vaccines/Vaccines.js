import "./vaccines.css"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { useContext } from "react"
import { inscription } from "../../services/axios/vaccines"
import Context from "../../context/context"
import { useState } from "react"

function Vaccines() {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const { dni } = useContext(Context)

  const handleInscription = (vaccine) => {
    inscription(vaccine, dni)
      .then((res) => {
        setMessage(res.data)
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
            <Button handleClick={() => handleInscription("covid")} text="Inscribirme" />
          </div>
          <div className="vaccine">
            <p>Fiebre amarilla</p>
            <Button handleClick={() => handleInscription("fever")} text="Inscribirme" />
          </div>
          <div className="vaccine">
            <p>Gripe</p>
            <Button handleClick={() => handleInscription("flu")} text="Inscribirme" />
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
