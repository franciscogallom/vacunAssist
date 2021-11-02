import './onboarding.css'
import axios from "axios"
import { useState } from "react"
import { useHistory } from 'react-router-dom'
import homeBannerSVG from "../../assets/images/home-banner.svg"
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button"
import { signupValidation } from "../../services/signupValidation"

function Signup() {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [dni, setDni] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [vaccination, setVaccination] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()
    
    const handleSignUp = () => {
      setErrors(
        signupValidation({ email, name, lastname, dni, password, verifyPassword, dateOfBirth })
      )
      if (errors.length === 0) {
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
            console.log(res)
            history.push("/comorbidities")
          })
          .catch((error) => {
            console.log(error)
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
            <div className="form-container">
              <form className="form">
                <img className="logo" src={logo} alt="Logo de VacunAssist" />
                <input onChange={(e) => setName(e.target.value)} placeholder="Nombre" type="text" />
                <input
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Apellido"
                  type="text"
                />
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
                  <Button
                    handleClick={() => history.push("/login")}
                    text="Ya tengo cuenta!"
                    secondary
                  />
                </div>
              </form>
            </div>
          
          <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
        </div>
      )
  }
  
  export default Signup