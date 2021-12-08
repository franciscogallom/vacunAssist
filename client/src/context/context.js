import { createContext, useState } from "react"

const Context = createContext({})

export function ContextProvider({ children }) {
  const [dni, setDni] = useState("12345678")

  return <Context.Provider value={{ dni, setDni }}>{children}</Context.Provider>
}

export default Context
