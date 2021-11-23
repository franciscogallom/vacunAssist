import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { addVaccinator } from "../../services/axios/admin"
import { useState, useEffect } from "react"

function Inscriptions() {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Obtener las vacunas de todos los inscriptos"
  })

  const vaccines = [
    {
      data: "Francisco Gallo, 42619102",
      covid: "30/11/2021",
      flu: undefined,
      fever: "waiting",
    },
    {
      data: "Francisco Gallo, 42619102",
      covid: "30/11/2021",
      flu: undefined,
      fever: "waiting",
    },
  ]

  return (
    <>
      <Navbar />
      <Form>
        <h5>Pacientes inscriptos a vacunas.</h5>

        <ul>
          {vaccines.map((vaccine, index) => {
            return (
              <li
                key={index}
              >{`${vaccine.data}. COVID: ${vaccine.covid}, fiebre: ${vaccine.fever}, flu: ${vaccine.flu}.`}</li>
            )
          })}
        </ul>

        {error.length > 0 && (
          <ul className="form-errors">
            <li>{error}</li>
          </ul>
        )}

        {message && <p className="validation-message">{message}</p>}

        {/* <div className="buttons-container">
          <Button handleClick={() => alert()} text="Añadir vacunador" />
        </div> */}
      </Form>
    </>
  )
}

export default Inscriptions
