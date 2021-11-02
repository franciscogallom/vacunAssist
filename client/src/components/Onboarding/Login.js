import './onboarding.css'
import axios from "axios"
import { useState } from "react"
import { useHistory } from 'react-router-dom'
import homeBannerSVG from "../../assets/images/home-banner.svg"
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button"

function Login() {
    const [dniLogin, setDniLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()
  
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
          setErrors(error)
          console.log(errors)
        })
    }
  
    return (
        <div className="onboarding-container">
          
            <div className="form-container">
              <form className="form">
                <img className="logo" src={logo} alt="Logo de VacunAssist" />
                <input onChange={(e) => setDniLogin(e.target.value)} placeholder="DNI" type="number" />
                <input
                  onChange={(e) => setPasswordLogin(e.target.value)}
                  placeholder="Contraseña"
                  type="password"
                />
    
                <div className="buttons-container">
                  <Button handleClick={() => handleLogin()} text="Iniciar sesión" />
                  <Button
                    handleClick={() => history.push('/')}
                    text="No tengo cuenta"
                    secondary
                  />
                </div>
              </form>
            </div>          
          <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
        </div>
      )
  }
  
  export default Login