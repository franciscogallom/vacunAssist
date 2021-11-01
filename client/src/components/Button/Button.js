import "./button.css"

function Button({ handleClick, text, secondary }) {
  const handleOnClick = (e) => {
    e.preventDefault()
    handleClick()
  }

  return (
    <button
      onClick={(e) => handleOnClick(e)}
      className={`btn ${secondary ? "btnSecondary" : "btnPrimary"}`}
    >
      {text}
    </button>
  )
}

export default Button
