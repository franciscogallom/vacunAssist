import { useContext, useState, useEffect } from "react"
import { getNameByDni } from "../../services/axios/users"
import { getVaccinatorNameByDni } from "../../services/axios/vaccinators"
import Context from "../../context/context"
import Navbar from "../Navbar/Navbar"

function Home() {
  const { dni } = useContext(Context)
  const [name, setName] = useState("")

  const isAdmin = localStorage.getItem("admin")
  const isVaccinator = localStorage.getItem("vaccinator")

  useEffect(() => {
    if (isVaccinator) {
      getVaccinatorNameByDni(dni)
        .then((res) => {
          setName(res.data.name)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      getNameByDni(dni)
        .then((res) => {
          console.log(res)
          setName(res.data.name)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Navbar />
      <h1 style={{ marginLeft: "7.5vw" }}>
        {isAdmin ? "Panel de administrador." : `Bienvenido ${name}!`}
      </h1>
    </>
  )
}

export default Home
