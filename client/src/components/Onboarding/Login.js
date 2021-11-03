import "./onboarding.css"
import axios from "axios"
import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button"
import Context from "../../context/context"

function Login() {
  const { dni, setDni } = useContext(Context)
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  const history = useHistory()

  const handleLogin = () => {
    if ( dni.length === 0  || password.length === 0){
      setErrors(["Complete todos los datos."])  
    } else {
       axios
         .post("http://localhost:8080/api/auth/login", {
           dni,
           password,
         })
         .then((res) => {
           if (res.data.error) {
             setErrors([res.data.message])
           } else {
             history.push("/home")
           }
         })
         .catch((error) => {
           setErrors(error)
           console.log(errors)
         })
    }
  }

  return (
    <div className="onboarding-container">
      <div className="form-container">
        <form className="form">
          <img className="logo" src={logo} alt="Logo de VacunAssist" />
          <input onChange={(e) => setDni(e.target.value)} placeholder="DNI" type="number" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            type="password"
          />

          {errors.length > 0 && (
            <ul className="form-errors">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}

          <div className="buttons-container">
            <Button handleClick={() => handleLogin()} text="Iniciar sesión" />
            <Button handleClick={() => history.push("/")} text="No tengo cuenta" secondary />
          </div>
        </form>
      </div>
      <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
    </div>
  )
}

export default Login
