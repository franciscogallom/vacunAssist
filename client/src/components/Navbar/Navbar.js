import { Link } from "react-router-dom"
import vaccine from "../../assets/images/vaccine.png"
import profile from "../../assets/images/user.png"
import close from "../../assets/images/close.png"
import "./navbar.css"

function Navbar() {
  return (
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link to="/" class="nav-link">
            <img src={profile} alt="Icono de perfil" className="img-icon" />
            <span class="link-text">Perfil</span>
          </Link>
        </li>

        <li class="nav-item">
          <Link to="/" class="nav-link">
            <img src={vaccine} alt="Icono de vacuna" className="img-icon" />
            <span class="link-text">Vacunas</span>
          </Link>
        </li>

        <li class="nav-item">
          <Link to="/" class="nav-link">
            <img src={close} alt="Icono de cerrar sesión" className="img-icon" />
            <span class="link-text">Cerrar sesión</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
