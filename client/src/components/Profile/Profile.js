import { useState, useContext, useEffect } from "react"
import Context from "../../context/context"
import Navbar from "../Navbar/Navbar"
import Form from "../Form/Form"
import Button from "../Button/Button"
import { changePasswordValidations } from "../../services/changePasswordValidations"
import {
  updatePassword,
  checkPassword,
  getVaccnation,
  updateVaccination,
} from "../../services/axios/users"
import Comorbidities from "../Onboarding/Comorbidities"

function Profile() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")
  const [vaccination, setVaccination] = useState("")
  const [vaccinationMessage, setVaccintionMessage] = useState("")
  const [vaccinationError, setVaccinationError] = useState("")
  const [updateMessage, setUpdateMessage] = useState("")
  const [initialVaccination, setInitialVaccination] = useState("")

  const { dni } = useContext(Context)

  useEffect(() => {
    getVaccnation(dni)
      .then((res) => {
        setVaccination(res.data)
        setInitialVaccination(res.data)
        if (res.data === "polideportivo") {
          setVaccintionMessage("Polideportivo")
        } else if (res.data === "corralon") {
          setVaccintionMessage("Corralón Municipal")
        } else {
          setVaccintionMessage("Anexo Hospital 9 de Julio")
        }
      })
      .catch((e) => {
        console.log(e)
        setVaccinationError("Algo salio mal...")
      })
  }, [dni])

  const handleUpdateVaccination = () => {
    if (vaccination !== initialVaccination) {
      updateVaccination(dni, vaccination)
        .then((res) => {
          setUpdateMessage(res.data)
          setInitialVaccination(vaccination)
          setTimeout(() => {
            setUpdateMessage("")
          }, 5000)
          if (vaccination === "polideportivo") {
            setVaccintionMessage("Polideportivo")
          } else if (vaccination === "corralon") {
            setVaccintionMessage("Corralón Municipal")
          } else {
            setVaccintionMessage("Anexo Hospital 9 de Julio")
          }
        })
        .catch((e) => {
          console.log(e)
          setVaccinationError("Algo salio mal...")
        })
    } else {
      setVaccinationError("Este ya es tu vacunatorio actual.")
      setTimeout(() => {
        setVaccinationError("")
      }, 5000)
    }
  }

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

        <Button handleClick={() => handleChangePassword()} text="Cambiar contraseña" />

        {message.length > 0 && <p className="validation-message">{message}</p>}
      </Form>
      <Comorbidities />

      <Form>
        <h5>Cambiar vacunatorio.</h5>

        <p className="form-label">Mi vacunatorio actual es {vaccinationMessage}.</p>
        <select
          style={{ marginBottom: "1em" }}
          id="vaccination"
          onChange={(e) => setVaccination(e.target.value)}
          className="select"
        >
          <option value="polideportivo">Polideportivo</option>
          <option value="corralon">Corralón Municipal</option>
          <option value="anexo">Anexo Hospital 9 de Julio</option>
        </select>

        <Button text="Actualizar" handleClick={() => handleUpdateVaccination()} />
        {updateMessage && <p className="validation-message">{updateMessage}</p>}
        {vaccinationError && <p className="error-message">{vaccinationError}</p>}
      </Form>
    </>
  )
}

export default Profile
