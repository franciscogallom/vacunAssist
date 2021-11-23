import { useState, useContext } from "react"
import Context from "../../context/context"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { changePasswordValidations } from "../../services/changePasswordValidations"
import { updatePassword, checkPassword } from "../../services/axios/users"
import Comorbidities from "../Onboarding/Comorbidities"

function Profile() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")

  const { dni } = useContext(Context)

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
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Actual contraseña"
          type="password"
        />
        <input
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nueva contraseña"
          type="password"
        />
        <input
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
    </>
  )
}

export default Profile
