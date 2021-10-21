import "./App.css"
import { useEffect, useState } from "react"

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de usuarios</h1>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <h1>{user.email}</h1>
              <h1>{user.name}</h1>
              <h1>{user.dni}</h1>
            </div>
          ))
        ) : (
          <h1>No hay usuarios</h1>
        )}
      </header>
    </div>
  )
}

export default App
