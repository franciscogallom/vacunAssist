export const getTodayDate = () => {
  const todayDate = new Date()
  const UTCDay = todayDate.getDate()
  const day = UTCDay < 10 ? `0${UTCDay}` : UTCDay
  return `Turno para el ${day}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}.`
}
