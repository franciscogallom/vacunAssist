import "./onboarding.css"
import { signup } from "../../services/axios/onboarding"
import { getVaccination } from "../../services/axios/vaccinators"
import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import Button from "../Button/Button"
import Form from "../Form/Form"
import { signupValidation } from "../../services/signupValidation"
import Context from "../../context/context"

function Signup() {
  const { dni, setDni } = useContext(Context)
  const [dniAsVaccinator, setDniAsVaccinator] = useState()
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [vaccination, setVaccination] = useState("polideportivo")
  const [vaccine, setVaccine] = useState("covid")
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")
  const [vaccinatorVaccination, setVaccinatorVaccination] = useState("")
  const history = useHistory()

  const isVaccinator = localStorage.getItem("vaccinator")

  useEffect(() => {
    if (isVaccinator) {
      getVaccination(dni)
        .then((res) => {
          setVaccinatorVaccination(res.data)
          console.log(res.data)
          console.log(vaccinatorVaccination)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignUp = () => {
    const finalDni = isVaccinator ? dniAsVaccinator : dni
    const checkPassword = !isVaccinator
    const validations = signupValidation({
      email,
      name,
      lastname,
      finalDni,
      password,
      verifyPassword,
      dateOfBirth,
      checkPassword,
    })
    setErrors(validations)
    if (validations.length === 0) {
      signup(
        email,
        name,
        lastname,
        finalDni,
        password,
        vaccination,
        dateOfBirth,
        isVaccinator,
        vaccine
      )
        .then((res) => {
          if (res.data.error) {
            setErrors((prevState) => [...prevState, res.data.message])
          } else {
            if (isVaccinator) {
              setMessage("Paciente registrado exitosamente.")
              document.getElementById("dni").value = ""
              document.getElementById("name").value = ""
              document.getElementById("lastname").value = ""
              document.getElementById("email").value = ""
              document.getElementById("password").value = ""
              document.getElementById("check-password").value = ""
              document.getElementById("date").value = ""
              document.getElementById("vaccine").value = "covid"
              setTimeout(() => {
                setMessage("")
              }, 5000)
            } else {
              history.push("/comorbidities")
            }
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
        {isVaccinator ? (
          <input
            id="dni"
            onChange={(e) => {
              setDniAsVaccinator(e.target.value)
              console.log(dniAsVaccinator)
            }}
            placeholder="DNI"
            type="number"
          />
        ) : (
          <input onChange={(e) => setDni(e.target.value)} placeholder="DNI" type="number" />
        )}
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          type="password"
        />
        <input
          id="check-password"
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder="Repetir contraseña"
          type="password"
        />

        <p className="form-label">Fecha de nacimiento</p>
        <input
          id="date"
          min="1890-01-01"
          max={`${getMaxDate()}`}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="form-date"
          type="date"
        />

        {!isVaccinator && (
          <>
            {" "}
            <p className="form-label">Vacunatorio</p>
            <select
              id="vaccination"
              onChange={(e) => setVaccination(e.target.value)}
              className="select"
            >
              <option value="polideportivo">Polideportivo</option>
              <option value="corralon">Corralón Municipal</option>
              <option value="anexo">Anexo Hospital 9 de Julio</option>
            </select>
          </>
        )}
        {isVaccinator && (
          <>
            <p className="form-label">Vacuna aplicada</p>
            <select id="vaccine" onChange={(e) => setVaccine(e.target.value)} className="select">
              <option value="covid">COVID-19</option>
              <option value="flu">Gripe</option>
              <option value="fever">Fiebre amarilla</option>
            </select>
          </>
        )}
        {errors.length > 0 && (
          <ul className="form-errors">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        {message && <p className="validation-message">{message}</p>}

        <div className="buttons-container">
          {
            <Button
              handleClick={() => handleSignUp()}
              text={isVaccinator ? "Registrar paciente" : "Registrarme"}
            />
          }
          {!isVaccinator && (
            <Button handleClick={() => history.push("/login")} text="Ya tengo cuenta!" secondary />
          )}
        </div>
      </Form>

      {!isVaccinator && (
        <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
      )}
    </div>
  )
}

export default Signup
