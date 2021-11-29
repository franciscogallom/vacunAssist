import { useState, useContext, useEffect } from "react"
import Context from "../../context/context"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { changePasswordValidations } from "../../services/changePasswordValidations"
import { updatePassword, checkPassword } from "../../services/axios/users"
import { getVaccinesByDni } from "../../services/axios/inscriptions"
import Comorbidities from "../Onboarding/Comorbidities"

function Profile() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [vaccines, setVaccines] = useState("")
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")

  const { dni } = useContext(Context)

  useEffect(() => {
    getVaccinesByDni(dni)
      .then((res) => {
        setVaccines(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const handleChangePassword = async () => {
    const validations = changePasswordValidations(newPassword, verifyPassword)
    setErrors(validations)

    checkPassword(oldPassword, dni)
      .then((res) => {
        if (!res.data.correctPassword) {
          setErrors((prevState) => [...prevState, "Tu contraseña actual no es correcta."])
        } else {
          if (validations.length === 0) {
            updatePassword(newPassword, dni)
              .then(() => {
                setMessage("Contraseña actualizada.")
                document.getElementById("old-password").value = ""
                document.getElementById("new-password").value = ""
                document.getElementById("check-password").value = ""
                setTimeout(() => {
                  setMessage("")
                }, 5000)
              })
              .catch((error) => {
                console.log(error)
                setErrors(["Algo salió mal, vuelve a intentarlo."])
              })
          }
        }
      })
      .catch((e) => {
        console.log("Error al chequear el password")
        console.log(e)
      })
  }

  return (
    <>
      <Navbar />
      <Form>
        <h5>Cambiar contraseña.</h5>
        <input
          id="old-password"
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Actual contraseña"
          type="password"
        />
        <input
          id="new-password"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nueva contraseña"
          type="password"
        />
        <input
          id="check-password"
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder="Repita la nueva contraseña"
          type="password"
        />

        {errors.length > 0 && (
          <ul className="form-errors">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        {message.length > 0 && <p className="validation-message">{message}</p>}

        <Button handleClick={() => handleChangePassword()} text="Cambiar contraseña" />
      </Form>
      <Comorbidities />
      <Form>
        <h5>Historial.</h5>
        <p>
          <span style={{ fontWeight: "bold" }}>COVID:</span> {vaccines.covid}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Fiebre amarilla:</span> {vaccines.fever}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Gripe:</span> {vaccines.flu}
        </p>
      </Form>
    </>
  )
}

export default Profile
