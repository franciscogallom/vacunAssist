import "./onboarding.css"
import { login } from "../../services/axios/onboarding"
import { useContext, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import Button from "../Button/Button"
import Context from "../../context/context"
import Form from "../Form/Form"

function Login() {
  const { dni, setDni } = useContext(Context)
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  const [errorOnConfirmation, setErrorOnConfirmation] = useState("")
  const history = useHistory()

  const handleLogin = () => {
    if (dni.length === 0 || password.length === 0) {
      setErrors(["Complete todos los datos."])
    } else {
      login(dni, password)
        .then((res) => {
          if (res.data.error) {
            if (res.data.confirmed) {
              setErrorOnConfirmation(true)
            }
            setErrors([res.data.message])
          } else {
            history.push("/verification")
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
      <Form>
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

        {errorOnConfirmation && (
          <Link
            style={{ fontWeight: "bold", fontSize: ".8em", color: "rgb(46, 139, 87)" }}
            to="/verification?signup=true"
          >
            Verificar
          </Link>
        )}

        <div className="buttons-container">
          <Button handleClick={() => handleLogin()} text="Iniciar sesión" />
          <Button handleClick={() => history.push("/signup")} text="No tengo cuenta" secondary />
        </div>
      </Form>
      <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
    </div>
  )
}

export default Login
