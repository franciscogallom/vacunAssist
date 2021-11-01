export const signupValidation = ({
    email,
    name,
    lastname,
    dni,
    password,
    verifyPassword,
    }) => {
    const errors = []
    const regexEmail = new RegExp(".+@.+..+", "")
    const regexPassword = new RegExp("^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})")
    
    (name.length === 0) && errors.push('Ingrese un nombre.')
        
    (lastname.length === 0) && errors.push('Ingrese un apellido.')

    (!regexEmail.test(email)) && errors.push('El email es inválido.')

    (dni.length > 8 || dni.length < 6) && errors.push('El DNI debe contener entre 6 y 8 números.')
     
    (!regexPassword.test(password)) && errors.push('La contraseña debe contener 8 o más caracteres, al menos una mayúscula, una minúscula, un número y un símbolo no alfanumérico.')
    !(verifyPassword === password) && errors.push('Las contraseñas deben coincidir.')

    return errors
}