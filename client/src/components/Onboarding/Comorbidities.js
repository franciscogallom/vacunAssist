import "./onboarding.css"
import { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useContext } from "react"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import Button from "../Button/Button"
import Context from "../../context/context"
import { updateComorbidities } from "../../services/axios/onboarding"
import Form from "../Form/Form"
import { getComorbidities } from "../../services/axios/users"

function Comorbidities() {
  const { dni } = useContext(Context)
  const [message, setMessage] = useState("")
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

  const useQuery = () => new URLSearchParams(useLocation().search)
  const isEditProfile = useQuery().get("editProfile")

  useEffect(() => {
    if (isEditProfile) {
      getComorbidities(dni)
        .then((res) => {
          setCom1(res.data.com1 === 1)
          setCom2(res.data.com2 === 1)
          setCom3(res.data.com3 === 1)
          setCom4(res.data.com4 === 1)
          setCom5(res.data.com5 === 1)
          setCom6(res.data.com6 === 1)
          setCom7(res.data.com7 === 1)
          setCom8(res.data.com8 === 1)
          setCom9(res.data.com9 === 1)
          setCom10(res.data.com10 === 1)
          setCom11(res.data.com11 === 1)
          setCom12(res.data.com12 === 1)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = () => {
    updateComorbidities({
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
        if (isEditProfile) {
          setMessage("Comorbilidades actualizadas satisfactoriamente.")
          setTimeout(() => {
            setMessage("")
          }, 5000)
        } else {
          history.push("/verification?signup=true")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="onboarding-container">
      <Form>
        <h5>
          {isEditProfile
            ? "Editar comorbilidades."
            : "Haga click en las comorbilidades que le correspondan y luego continue."}
        </h5>
        <div className="comorbidities-container">
          <p onClick={() => setCom1((prevState) => !prevState)} className={com1 ? "active" : ""}>
            <span className="icon">{com1 ? "✅" : "⬜"}</span> Diabetes tipo 1 o 2.
          </p>
          <p onClick={() => setCom2((prevState) => !prevState)} className={com2 ? "active" : ""}>
            <span className="icon">{com2 ? "✅" : "⬜"}</span> Obesidad de 2do o 3er grado.
          </p>
          <p onClick={() => setCom3((prevState) => !prevState)} className={com3 ? "active" : ""}>
            <span className="icon">{com3 ? "✅" : "⬜"}</span> Enfermedad cardiovascular.
          </p>
          <p onClick={() => setCom4((prevState) => !prevState)} className={com4 ? "active" : ""}>
            <span className="icon">{com4 ? "✅" : "⬜"}</span> Enfermedad renal crónica (incluidos
            pacientes en diálisis crónica).
          </p>
          <p onClick={() => setCom5((prevState) => !prevState)} className={com5 ? "active" : ""}>
            <span className="icon">{com5 ? "✅" : "⬜"}</span> Enfermedad respiratoria crónica.
          </p>
          <p onClick={() => setCom6((prevState) => !prevState)} className={com6 ? "active" : ""}>
            <span className="icon">{com6 ? "✅" : "⬜"}</span> VIH (independientemente del recuento
            de CD4 y niveles de carga viral).
          </p>
          <p onClick={() => setCom7((prevState) => !prevState)} className={com7 ? "active" : ""}>
            <span className="icon">{com7 ? "✅" : "⬜"}</span> En lista de espera para trasplante de
            órganos sólidos y trasplantados de órganos sólidos.
          </p>
          <p onClick={() => setCom8((prevState) => !prevState)} className={com8 ? "active" : ""}>
            <span className="icon">{com8 ? "✅" : "⬜"}</span> Personas con discapacidad residentes
            de hogares, residencias y pequeños hogares.
          </p>
          <p onClick={() => setCom9((prevState) => !prevState)} className={com9 ? "active" : ""}>
            <span className="icon">{com9 ? "✅" : "⬜"}</span> Pacientes oncológicos y
            oncohematológicos.
          </p>
          <p onClick={() => setCom10((prevState) => !prevState)} className={com10 ? "active" : ""}>
            <span className="icon">{com10 ? "✅" : "⬜"}</span> Tratamiento quimioterápico.
          </p>
          <p onClick={() => setCom11((prevState) => !prevState)} className={com11 ? "active" : ""}>
            <span className="icon">{com11 ? "✅" : "⬜"}</span> Cursando una TB activa.
          </p>
          <p onClick={() => setCom12((prevState) => !prevState)} className={com12 ? "active" : ""}>
            <span className="icon">{com12 ? "✅" : "⬜"}</span> Personas con discapacidad
            Intelectual y del desarrollo.
          </p>
        </div>

        <div className="buttons-container">
          <Button
            handleClick={() => handleSubmit()}
            text={isEditProfile ? "Actualizar" : "Continuar"}
          />
        </div>

        {message && <p className="validation-message">{message}</p>}
      </Form>

      {!isEditProfile && (
        <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
      )}
    </div>
  )
}

export default Comorbidities
