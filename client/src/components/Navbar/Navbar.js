import { Link } from "react-router-dom"
import vaccine from "../../assets/images/vaccine.png"
import profile from "../../assets/images/user.png"
import close from "../../assets/images/close.png"
import home from "../../assets/images/home.png"
import "./navbar.css"

function Navbar() {
  const isAdmin = localStorage.getItem("admin")
  const isVaccinator = localStorage.getItem("vaccinator")

  let profileRoute
  let vaccineMessage
  let vaccineRoute
  if (isAdmin) {
    profileRoute = "/add-vaccinator"
    vaccineMessage = "Stock"
    vaccineRoute = "/stock"
  } else if (isVaccinator) {
    profileRoute = "/add-user"
    vaccineMessage = "Vacunas"
    vaccineRoute = "/inscriptions"
  } else {
    profileRoute = "/profile?editProfile=true"
    vaccineMessage = "Vacunas"
    vaccineRoute = "/vaccines"
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            <img src={home} alt="Icono de Home" className="img-icon" />
            <span className="link-text">Home</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={profileRoute} className="nav-link">
            <img src={profile} alt="Icono de perfil" className="img-icon" />
            <span className="link-text">{isAdmin || isVaccinator ? "Añadir" : "Perfil"}</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={vaccineRoute} className="nav-link">
            <img src={vaccine} alt="Icono de vacuna" className="img-icon" />
            <span className="link-text">{vaccineMessage}</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            onClick={() => {
              localStorage.removeItem("admin")
              localStorage.removeItem("vaccinator")
            }}
            to="/"
            className="nav-link"
          >
            <img src={close} alt="Icono de cerrar sesión" className="img-icon" />
            <span className="link-text">Salir</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
