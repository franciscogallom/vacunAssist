import "./onboarding.css"
import axios from "axios"
import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import Button from "../Button/Button"
import Form from "../Form/Form"
import { signupValidation } from "../../services/signupValidation"
import Context from "../../context/context"

function Signup() {
  const { dni, setDni } = useContext(Context)
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [vaccination, setVaccination] = useState("polideportivo")
  const [errors, setErrors] = useState([])
  const history = useHistory()

  const handleSignUp = () => {
    const validations = signupValidation({
      email,
      name,
      lastname,
      dni,
      password,
      verifyPassword,
      dateOfBirth,
    })
    setErrors(validations)
    if (validations.length === 0) {
      axios
        .post("http://localhost:8080/api/auth/signup", {
          email,
          name,
          lastname,
          dni,
          password,
          vaccination,
          date_of_birth: dateOfBirth,
        })
        .then((res) => {
          if (res.data.error) {
            setErrors((prevState) => [...prevState, res.data.message])
          } else {
            history.push("/comorbidities")
          }
        })
        .catch((error) => {
          console.log(error)
          setErrors((prevState) => [...prevState, "Algo salió mal..."])
        })
    }
  }

  const getMaxDate = () => {
    const todayDate = new Date()
    const UTCDay = todayDate.getUTCDay()
    const day = UTCDay < 10 ? `0${UTCDay}` : UTCDay
    return `${todayDate.getFullYear()}-${todayDate.getMonth()}-${day}`
  }

  return (
    <div className="onboarding-container">
      <Form>
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
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder="Repetir contraseña"
          type="password"
        />

        <p className="form-label">Fecha de nacimiento</p>
        <input
          min="1890-01-01"
          max={`${getMaxDate()}`}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="form-date"
          type="date"
        />

        <p className="form-label">Vacunatorio</p>
        <select onChange={(e) => setVaccination(e.target.value)} className="select">
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

        <div className="buttons-container">
          <Button handleClick={() => handleSignUp()} text="Registrarme" />
          <Button handleClick={() => history.push("/login")} text="Ya tengo cuenta!" secondary />
        </div>
      </Form>

      <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
    </div>
  )
}

export default Signup
