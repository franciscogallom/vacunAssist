const transporter = require("../config/nodemailer")

const sendMail = async (addressee, verificationCode) =>
  await transporter.sendMail({
    from: '"VacunAssist ✅" <vacunassist@gmail.com>',
    to: addressee,
    subject: "Código de verificación.",
    html: `<p>Tu código de verificación es ${verificationCode}. Expira en 10 minutos.</p>`,
  })

module.exports = sendMail
