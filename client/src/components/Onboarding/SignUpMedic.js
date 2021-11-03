import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button"
import Context from "../../context/context"
import Form from "../Form/Form"

function SignUpMedic() {
  const { dni, setDni } = useContext(Context)
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const history = useHistory()

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
          placeholder="Repetir contraseña"
          type="password"
          onChange={(e) => setVerifyPassword(e.target.value)}
        />

        <div className="buttons-container">
          <Button handleClick={() => alert("Registrado!")} text="Registrarme" />
          <Button handleClick={() => history.push("/login")} text="Ya tengo cuenta!" secondary />
        </div>
      </Form>

      <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
    </div>
  )
}

export default SignUpMedic
