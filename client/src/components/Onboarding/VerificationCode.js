import "./onboarding.css"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button"
import axios from "axios"
import { useContext } from "react/cjs/react.development"
import Context from "../../context/context"

function VerificationCode() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const history = useHistory()
  const { dni } = useContext(Context)

  useEffect(() => {
    removeItem()
  }, [])

  const handleSubmit = () => {
    if (code === localStorage.getItem("verificationCode")) {
      history.push("/home")
    } else {
      setError("El código no es correcto o expiró.")
    }
  }

  const sendAgain = () => {
    localStorage.setItem("verificationCode", Math.floor(Math.random() * (999999 - 100000)) + 100000)
    axios
      .post(`http://localhost:8080/api/auth/verification/${dni}`, {
        verificationCode: localStorage.getItem("verificationCode"),
      })
      .then(() => {
        setMessage("Código reenviado!")
        setTimeout(() => {
          setMessage("")
        }, 8000)
      })
      .catch((error) => {
        console.log(error)
      })
    removeItem()
  }

  const removeItem = () =>
    setTimeout(() => {
      localStorage.removeItem("verificationCode")
    }, 60000 * 10)

  return (
    <div className="onboarding-container">
      <div className="form-container">
        <form className="form">
          <img className="logo" src={logo} alt="Logo de VacunAssist" />

          <h5 style={{ border: "none", opacity: ".75" }}>El código expirara en 10 minutos.</h5>
          {message && <p className="validation-message">{message}</p>}

          <input
            onChange={(e) => setCode(e.target.value)}
            placeholder="Codigo de verificación."
            type="number"
          />

          {error && (
            <ul className="form-errors">
              <li>{error}</li>
            </ul>
          )}

          <div className="buttons-container">
            <Button handleClick={() => handleSubmit()} text="Registrarme" />
            <Button handleClick={() => sendAgain()} text="Reenviar código" secondary />
          </div>
        </form>
      </div>
      <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
    </div>
  )
}

export default VerificationCode
