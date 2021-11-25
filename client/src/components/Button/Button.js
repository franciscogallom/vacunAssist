import "./button.css"

function Button({ handleClick, text, secondary, isSmall }) {
  const handleOnClick = (e) => {
    e.preventDefault()
    handleClick()
  }

  return (
    <button
      onClick={(e) => handleOnClick(e)}
      className={`btn ${secondary ? "btnSecondary" : "btnPrimary"} ${isSmall ? "small" : ""}`}
    >
      {text}
    </button>
  )
}

export default Button
