import "./onboarding.css"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import Button from "../Button/Button"
import { sendEmailByDni, updateConfirmed } from "../../services/axios/onboarding"
import { useContext } from "react/cjs/react.development"
import Context from "../../context/context"
import Form from "../Form/Form"

function VerificationCode() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const history = useHistory()
  const { dni } = useContext(Context)

  const sendEmail = () => {
    sendEmailByDni(dni)
      .then((res) => {
        console.log(res)
        setTimeout(() => {
          localStorage.removeItem("verificationCode")
        }, 60000 * 60)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const sendAgain = () => {
    localStorage.setItem("verificationCode", Math.floor(Math.random() * (999999 - 100000)) + 100000)
    sendEmail()
    setMessage("Codigo reenviado!")
    setTimeout(() => {
      setMessage("")
    }, 8000)
    setError("")
  }

  useEffect(() => {
    localStorage.setItem("verificationCode", Math.floor(Math.random() * (999999 - 100000)) + 100000)
    sendEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = () => {
    if (code === localStorage.getItem("verificationCode")) {
      updateConfirmed(dni)
        .then((res) => {
          console.log(res)
          history.push("/home")
        })
        .catch((error) => {
          console.log(error)
          setError("Algo salio mal...")
        })
    } else {
      setError("El código no es correcto o expiró.")
    }
  }

  return (
    <div className="onboarding-container">
      <Form>
        {!message ? (
          <h5 style={{ border: "none", opacity: ".7" }}>
            Te enviamos un código a tu correo, tene en cuenta que expirará en 10 minutos.
          </h5>
        ) : (
          <p className="validation-message">{message}</p>
        )}

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
          <Button handleClick={() => handleSubmit()} text="Continuar" />
          <Button handleClick={() => sendAgain()} text="Reenviar código" secondary />
        </div>
      </Form>
      <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
    </div>
  )
}

export default VerificationCode
