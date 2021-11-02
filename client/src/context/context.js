import { createContext, useState } from "react";

const Context = createContext({})

export function ContextProvider({children}) {
    const [ dni, setDni ] = useState('')

    return <Context.Provider value={{dni, setDni}}>
        {children}
    </Context.Provider>
}

export default Context