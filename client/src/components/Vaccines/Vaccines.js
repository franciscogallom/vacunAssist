import "./vaccines.css"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"

function Vaccines() {
  return (
    <>
      <Navbar />
      <Form>
        <h5>Inscripción a vacunas.</h5>
        <div className="vaccines-container">
          <div className="vaccine">
            <p>Coronavirus</p>
            <Button handleClick={() => alert("click")} text="Inscribirme" />
          </div>
          <div className="vaccine">
            <p>Fiebre amarilla</p>
            <Button handleClick={() => alert("click")} text="Inscribirme" />
          </div>
          <div className="vaccine">
            <p>Gripe</p>
            <Button handleClick={() => alert("click")} text="Inscribirme" />
          </div>
        </div>
      </Form>
    </>
  )
}

export default Vaccines
