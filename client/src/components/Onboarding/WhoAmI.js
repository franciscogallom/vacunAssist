import "./onboarding.css"
import homeBannerSVG from "../../assets/images/home-banner.svg"
import logo from "../../assets/images/logo.png"
import Button from "../Button/Button"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import { updateTurns } from "../../services/axios/admin"

function WhoAmI() {
  const history = useHistory()

  useEffect(() => {
    updateTurns()
      .then((res) => {
        console.log(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <div className="onboarding-container">
      <div className="form-container">
        <form className="form">
          <img className="logo" src={logo} alt="Logo de VacunAssist" />
          <div className="buttons-container">
            <Button
              handleClick={() => history.push("/login?vaccinator=true")}
              text="Soy vacunador"
            />
            <Button handleClick={() => history.push("/signup")} text="Soy paciente" secondary />
          </div>
        </form>
      </div>
      <img className="home-banner" src={homeBannerSVG} alt="Ilustración de médicos" />
    </div>
  )
}

export default WhoAmI
