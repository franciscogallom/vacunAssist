import { Link } from "react-router-dom"
import vaccine from "../../assets/images/vaccine.png"
import profile from "../../assets/images/user.png"
import close from "../../assets/images/close.png"
import home from "../../assets/images/home.png"
import "./navbar.css"

function Navbar() {
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
          <Link to="/profile?editProfile=true" className="nav-link">
            <img src={profile} alt="Icono de perfil" className="img-icon" />
            <span className="link-text">Perfil</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/vaccines" className="nav-link">
            <img src={vaccine} alt="Icono de vacuna" className="img-icon" />
            <span className="link-text">Vacunas</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link">
            <img src={close} alt="Icono de cerrar sesión" className="img-icon" />
            <span className="link-text">Salir</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
