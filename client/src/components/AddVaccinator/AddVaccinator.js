import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { addVaccinator } from "../../services/axios/admin"
import { useState } from "react"

function AddVaccinator() {
  const [dni, setDni] = useState("")
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleAdd = () => {
    if (password !== verifyPassword) {
      setError("Las contraseñas no coinciden.")
    } else {
      addVaccinator(email, name, lastname, dni, password)
        .then((res) => {
          if (res.data.error) {
            setError(res.data.message)
          } else {
            setMessage(res.data)
            setError("")
          }
        })
        .catch(() => {
          setError("Algo salio mal, vuelve a intentarlo.")
        })
    }
  }

  return (
    <>
      <Navbar />
      <Form>
        <h5>Ingrese los datos del vacunador.</h5>
        <input onChange={(e) => setName(e.target.value)} placeholder="Nombre" type="text" />
        <input onChange={(e) => setLastname(e.target.value)} placeholder="Apellido" type="text" />
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="text" />
        <input onChange={(e) => setDni(e.target.value)} placeholder="DNI" type="number" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          type="password"
        />
        <input
          placeholder="Repetir contraseña"
          type="password"
          onChange={(e) => setVerifyPassword(e.target.value)}
        />

        {error.length > 0 && (
          <ul className="form-errors">
            <li>{error}</li>
          </ul>
        )}

        {message && <p className="validation-message">{message}</p>}

        <div className="buttons-container">
          <Button handleClick={() => handleAdd()} text="Añadir vacunador" />
        </div>
      </Form>
    </>
  )
}

export default AddVaccinator
