import { Link } from "react-router-dom";
import "./Form.css";
export default function Form({
  name,
  title,
  children,
  buttonText,
  captionText,
  linkText,
  path,
  onSubmit,
  onClick,
  extraClassName,
  isValid,
}) {
  return (
    <form name={name} className="form" onSubmit={onSubmit} noValidate>
      <p className="form__title">{title}</p>
      {children}
      <button
        className={`form__button button ${extraClassName} ${
          isValid ? "" : "form__button_disabled"
        }`}
        onClick={onClick}
        disabled={!isValid}
      >
        {buttonText}
      </button>
      <p className="form__caption">
        {captionText}
        <Link to={`${path}`} className="form__link link">
          {linkText}
        </Link>
      </p>
    </form>
  );
}
