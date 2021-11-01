import { useState } from "react"
import "./App.css"
import homeBannerSVG from "./assets/images/home-banner.svg"
import Button from "./components/Button/Button"
import axios from "axios"

function App() {
  // Signup states.
  const [hasAnAccount, setHasAnAccount] = useState(false)
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [dni, setDni] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [vaccination, setVaccination] = useState("")
  // LoginStates
  const [dniLogin, setDniLogin] = useState("")
  const [passwordLogin, setPasswordLogin] = useState("")

  // maxDate
  
  const handleLogin = () => {
    axios
      .post("http://localhost:8080/api/auth/login", {
        dni: dniLogin,
        password: passwordLogin,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSignUp = () => {
    axios
      .post("http://localhost:8080/api/auth/signup" , {
        email,
        name,
        lastname,
        dni,
        password,
        vaccination,
        dateOfBirth
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getMaxDate = () => {
    const todayDate = new Date()
    let max=""
    if(todayDate.getUTCDay() < 10){
      max=`${todayDate.getFullYear()}-${todayDate.getMonth()}-0${todayDate.getUTCDay()}`
    }
    else{
      max=`${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getUTCDay()}`
    }
    return max
  }

  return (
    <div className="App">
      {hasAnAccount ? (
        <div className="form-container">
          <form className="form">
            <input onChange={(e) => setDniLogin(e.target.value)} placeholder="DNI" type="text" />
            <input
              onChange={(e) => setPasswordLogin(e.target.value)}
              placeholder="Contraseña"
              type="password"
            />

            <div className="buttons-container">
              <Button handleClick={() => handleLogin()} text="Iniciar sesión" />
              <Button
                handleClick={() => setHasAnAccount((prevState) => !prevState)}
                text="No tengo cuenta"
                secondary
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="form-container">
          <form className="form">
            <input onChange={(e) => setName(e.target.value)} placeholder="Nombre" type="text" />
            <input
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Apellido"
              type="text"
            />
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="text" />
            <input onChange={(e) => setDni(e.target.value)} placeholder="DNI" type="text" />
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

            <p className="form-label">Fecha de nacimiento.</p>
            <input min="1890-01-01" max={`${getMaxDate()}`} onChange={(e) => setDateOfBirth(e.target.value)} className="form-date" type="date" />

            <p className="form-label">Vacunatorio.</p>
            <select
              onChange={(e) => setVaccination(e.target.value)}
              className="select"
              name=""
              id=""
            >
              <option value="vac1">H.S.E. "Elina de la Serna de Montes"</option>
              <option value="vac2">Estadio "Único" de La Plata</option>
              <option value="vac3">Polideportivo Los Hornos </option>
            </select>

            <div className="buttons-container">
              <Button
                handleClick={() => handleSignUp() }
                text="Registrarme"
              />
              <Button
                handleClick={() => setHasAnAccount((prevState) => !prevState)}
                text="Ya tengo cuenta!"
                secondary
              />
            </div>
          </form>
        </div>
      )}
      <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
    </div>
  )
}

export default App
