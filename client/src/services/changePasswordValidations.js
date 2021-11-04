export const changePasswordValidations = (newPass, verifyPass) => {
  const errors = []
  const regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")

  if (!regexPassword.test(newPass))
    errors.push(
      "La contraseña debe contener 8 o más caracteres, al menos una mayúscula, una minúscula, un número y un símbolo no alfanumérico."
    )

  if (!(newPass === verifyPass)) errors.push("Las nuevas contraseñas deben coincidir.")

  return errors
}
