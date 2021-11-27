import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { addVaccinator } from "../../services/axios/admin"
import { useState } from "react"
import { addVaccinatorValidation } from "../../services/addVaccinatorValidation"

function AddVaccinator() {
  const [dni, setDni] = useState("")
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [vaccination, setVaccination] = useState("polideportivo")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState([])

  const handleAdd = () => {
    const validations = addVaccinatorValidation({
      name,
      lastname,
      email,
      dni,
      password,
      verifyPassword,
    })
    if (validations.length > 0) {
      setErrors(validations)
    } else {
      addVaccinator(email, name, lastname, dni, password, vaccination)
        .then((res) => {
          if (res.data.error) {
            setErrors([res.data.message])
          } else {
            setMessage(res.data)
            setErrors([])
            document.getElementById("name").value = ""
            document.getElementById("lastname").value = ""
            document.getElementById("email").value = ""
            document.getElementById("dni").value = ""
            document.getElementById("password").value = ""
            document.getElementById("verify-password").value = ""
            document.getElementById("vaccination").value = "polideportivo"
          }
        })
        .catch(() => {
          setErrors(["Algo salio mal, vuelve a intentarlo."])
        })
    }
  }

  return (
    <>
      <Navbar />
      <Form>
        <h5>Ingrese los datos del vacunador.</h5>
        <input
          id="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          type="text"
        />
        <input
          id="lastname"
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Apellido"
          type="text"
        />
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
        />
        <input id="dni" onChange={(e) => setDni(e.target.value)} placeholder="DNI" type="number" />
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          type="password"
        />
        <input
          id="verify-password"
          placeholder="Repetir contraseña"
          type="password"
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        <p className="form-label">Vacunatorio</p>
        <select
          id="vaccination"
          onChange={(e) => setVaccination(e.target.value)}
          className="select"
        >
          <option value="polideportivo">Polideportivo</option>
          <option value="corralon">Corralón municipal</option>
          <option value="anexo">Anexo Hospital 9 de Julio</option>
        </select>

        {errors.length > 0 && (
          <ul className="form-errors">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
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
