import { useContext } from "react"
import Context from "../../context/context"

function Home() {
  const { dni } = useContext(Context)
  return <h1>Home - {dni}</h1>
}

export default Home
