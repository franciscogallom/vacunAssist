export const addVaccinatorValidation = ({
  name,
  lastname,
  email,
  dni,
  password,
  verifyPassword,
}) => {
  const errors = []
  const regexEmail = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "")
  const regexPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
    ""
  )
  if (name.length === 0) errors.push("Ingrese un nombre.")
  if (lastname.length === 0) errors.push("Ingrese un apellido.")
  if (!regexEmail.test(email)) errors.push("El email es inválido.")
  if (dni.length > 8 || dni.length < 6) errors.push("El DNI debe contener entre 6 y 8 números.")

  if (!regexPassword.test(password))
    errors.push(
      "La contraseña debe contener 8 o más caracteres, al menos una mayúscula, una minúscula, un número y un símbolo no alfanumérico."
    )
  if (!(verifyPassword === password)) errors.push("Las contraseñas deben coincidir.")
  return errors
}
