import { useState } from "react"
import "./App.css"
import homeBannerSVG from "./assets/images/home-banner.svg"
import Button from "./components/Button/Button"

function App() {
  const [hasAnAccount, setHasAnAccount] = useState(false)

  return (
    <div className="App">
      {hasAnAccount ? (
        <div className="form-container">
          <form className="form">
            <input placeholder="Email" type="text" />
            <input placeholder="Contraseña" type="password" />

            <div className="buttons-container">
              <Button handleClick={() => alert("Inicia sesión")} text="Iniciar sesión" />
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
            <input placeholder="Nombre" type="text" />
            <input placeholder="Apellido" type="text" />
            <input placeholder="Email" type="text" />
            <input placeholder="DNI" type="text" />
            <input placeholder="Contraseña" type="password" />
            <input placeholder="Repetir contraseña" type="password" />

            <p className="form-label">Fecha de nacimiento.</p>
            <input className="form-date" type="date" />

            <p className="form-label">Vacunatorio.</p>
            <select className="select" name="" id="">
              <option value="vac1">H.S.E. "Elina de la Serna de Montes"</option>
              <option value="vac2">Estadio "Único" de La Plata</option>
              <option value="vac3">Polideportivo Los Hornos </option>
            </select>

            <div className="buttons-container">
              <Button handleClick={() => alert("Se registra el usuario")} text="Registrarme" />
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
