import "./onboarding.css"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useContext } from "react"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button"
import Context from "../../context/context"
import axios from "axios"

function Comorbidities() {
  const { dni } = useContext(Context)
  const [com1, setCom1] = useState(false)
  const [com2, setCom2] = useState(false)
  const [com3, setCom3] = useState(false)
  const [com4, setCom4] = useState(false)
  const [com5, setCom5] = useState(false)
  const [com6, setCom6] = useState(false)
  const [com7, setCom7] = useState(false)
  const [com8, setCom8] = useState(false)
  const [com9, setCom9] = useState(false)
  const [com10, setCom10] = useState(false)
  const [com11, setCom11] = useState(false)
  const [com12, setCom12] = useState(false)
  const history = useHistory()

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/auth/signup/comorbidities", {
        dni,
        com1,
        com2,
        com3,
        com4,
        com5,
        com6,
        com7,
        com8,
        com9,
        com10,
        com11,
        com12,
      })
      .then((res) => {
        console.log(res)
        localStorage.setItem(
          "verificationCode",
          Math.floor(Math.random() * (999999 - 100000)) + 100000
        )
        history.push("/verification")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="onboarding-container">
      <div className="form-container">
        <form className="form">
          <img className="logo" src={logo} alt="Logo de VacunAssist" />
          <h5>Haga click en las comorbilidades que le correspondan y luego continue.</h5>
          <div className="comorbidities-container">
            <p onClick={() => setCom1((prevState) => !prevState)} className={com1 ? "active" : ""}>
              Diabetes tipo 1 o 2.
            </p>
            <p onClick={() => setCom2((prevState) => !prevState)} className={com2 ? "active" : ""}>
              Obesidad de 2do o 3er grado.
            </p>
            <p onClick={() => setCom3((prevState) => !prevState)} className={com3 ? "active" : ""}>
              Enfermedad cardiovascular.
            </p>
            <p onClick={() => setCom4((prevState) => !prevState)} className={com4 ? "active" : ""}>
              Enfermedad renal crónica (incluidos pacientes en diálisis crónica).
            </p>
            <p onClick={() => setCom5((prevState) => !prevState)} className={com5 ? "active" : ""}>
              Enfermedad respiratoria crónica.
            </p>
            <p onClick={() => setCom6((prevState) => !prevState)} className={com6 ? "active" : ""}>
              VIH (independientemente del recuento de CD4 y niveles de carga viral).
            </p>
            <p onClick={() => setCom7((prevState) => !prevState)} className={com7 ? "active" : ""}>
              En lista de espera para trasplante de órganos sólidos y trasplantados de órganos
              sólidos.
            </p>
            <p onClick={() => setCom8((prevState) => !prevState)} className={com8 ? "active" : ""}>
              Personas con discapacidad residentes de hogares, residencias y pequeños hogares.
            </p>
            <p onClick={() => setCom9((prevState) => !prevState)} className={com9 ? "active" : ""}>
              Pacientes oncológicos y oncohematológicos.
            </p>
            <p
              onClick={() => setCom10((prevState) => !prevState)}
              className={com10 ? "active" : ""}
            >
              Tratamiento quimioterápico.
            </p>
            <p
              onClick={() => setCom11((prevState) => !prevState)}
              className={com11 ? "active" : ""}
            >
              Cursando una TB activa.
            </p>
            <p
              onClick={() => setCom12((prevState) => !prevState)}
              className={com12 ? "active" : ""}
            >
              Personas con discapacidad Intelectual y del desarrollo.
            </p>
          </div>

          <div className="buttons-container">
            <Button handleClick={() => handleSubmit()} text="Continuar" />
          </div>
        </form>
      </div>

      <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
    </div>
  )
}

export default Comorbidities
