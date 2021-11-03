import "./form.css"
import logo from "../../assets/images/logo.png"
import { useHistory } from "react-router-dom"

function Form({ children }) {
  const history = useHistory()

  return (
    <div className="form-container">
      <form className="form">
        <img
          className="logo"
          onClick={() => history.push("/")}
          src={logo}
          alt="Logo de VacunAssist"
        />
        {children}
      </form>
    </div>
  )
}

export default Form
