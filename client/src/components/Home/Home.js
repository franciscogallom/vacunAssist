import { useContext } from "react"
import Context from "../../context/context"
import Navbar from "../Navbar/Navbar"

function Home() {
  const { dni } = useContext(Context)
  return (
    <>
      <Navbar />
      <h1 style={{ marginLeft: "7.5vw" }}>Home - {dni}</h1>
    </>
  )
}

export default Home
