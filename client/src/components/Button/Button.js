import "./button.css"

function Button({ handleClick, text, secondary }) {
  return (
    <button onClick={handleClick} className={`btn ${secondary ? "btnSecondary" : "btnPrimary"}`}>
      {text}
    </button>
  )
}

export default Button
