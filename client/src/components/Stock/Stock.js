import "./stock.css"
import Button from "../Button/Button"
import Form from "../Form/Form"
import Navbar from "../Navbar/Navbar"
import { useEffect, useState } from "react"
import { getStock, addStock } from "../../services/axios/admin"

function Stock() {
  const [vaccination, setVaccination] = useState("polideportivo")
  const [covid, setCovid] = useState(0)
  const [fever, setFever] = useState(0)
  const [flu, setFlu] = useState(0)
  const [addCovid, setAddCovid] = useState(0)
  const [addFever, setAddFever] = useState(0)
  const [addFlu, setAddFlu] = useState(0)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    getStock(vaccination)
      .then((res) => {
        setCovid(res.data.covid)
        setFever(res.data.fever)
        setFlu(res.data.flu)
      })
      .catch((e) => {
        console.log(e)
        setError("Algo salió mal...")
      })
  }, [vaccination, message])

  const handleAdd = (vaccine, stock) => {
    addStock(vaccination, stock, vaccine)
      .then((res) => {
        setMessage(res.data)
        setTimeout(() => {
          setMessage("")
        }, 5000)
        document.getElementById("covid").value = ""
        document.getElementById("fever").value = ""
        document.getElementById("flu").value = ""
      })
      .catch((e) => {
        console.log(e)
        setError("Algo salió mal...")
      })
  }

  return (
    <>
      <Navbar />
      <Form>
        <h5>Stock de vacunas.</h5>

        <p className="form-label-secondary">Vacunatorio.</p>
        <select
          id="vaccination"
          onChange={(e) => setVaccination(e.target.value)}
          className="select"
        >
          <option value="polideportivo">Polideportivo</option>
          <option value="corralon">Corralón municipal</option>
          <option value="anexo">Anexo Hospital 9 de Julio</option>
        </select>

        {message && <p className="validation-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="stock-vaccine-container">
          <p className="vaccine-title">COVID-19.</p>
          <input
            id="covid"
            onChange={(e) => setAddCovid(e.target.value)}
            placeholder="Cantidad de vacunas de COVID-19 a agregar."
            type="number"
          />
          <Button handleClick={() => handleAdd("covid", addCovid)} isSmall text="Agregar" />
          <p className="stock-message">Stock: {covid} unidades.</p>
        </div>

        <div className="stock-vaccine-container">
          <p className="vaccine-title">Fiebre amarilla.</p>
          <input
            id="fever"
            onChange={(e) => setAddFever(e.target.value)}
            placeholder="Cantidad de vacunas de fiebre amarilla a agregar."
            type="number"
          />
          <Button handleClick={() => handleAdd("fever", addFever)} isSmall text="Agregar" />
          <p className="stock-message">Stock: {fever} unidades.</p>
        </div>

        <div className="stock-vaccine-container">
          <p className="vaccine-title">Gripe.</p>
          <input
            id="flu"
            onChange={(e) => setAddFlu(e.target.value)}
            placeholder="Cantidad de vacunas de gripe a agregar."
            type="number"
          />
          <Button handleClick={() => handleAdd("flu", addFlu)} isSmall text="Agregar" />
          <p className="stock-message">Stock: {flu} unidades.</p>
        </div>
      </Form>
    </>
  )
}

export default Stock
