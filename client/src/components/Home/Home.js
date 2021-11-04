import { useContext, useState, useEffect} from "react"
import { getNameByDni } from "../../services/axios/users"
import Context from "../../context/context"
import Navbar from "../Navbar/Navbar"

function Home() {
  const { dni } = useContext(Context)
  const [ name, setName ] = useState('')

  useEffect(() => {
      getNameByDni(dni)
      .then((res) => {
        console.log(res)
        setName(res.data.name)
      }) 
      .catch((error) => {
        console.log(error)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  
  return (
    <>
      <Navbar />
      <h1 style={{ marginLeft: "7.5vw" }}>Bienvenido {name}!</h1>
    </>
  )
}

export default Home
