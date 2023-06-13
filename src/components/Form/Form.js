import { Link } from "react-router-dom";
import './Form.css';
export default function Form({ name, title, children, buttonText, captionText, linkText, path }) {
  return(
    <form name={name} className="form">
      <p className="form__title">{title}</p>
      {children}
      <button className="form__button button">{buttonText}</button>
      <p className="form__caption">{captionText}<Link to={`${path}`} className="form__link link">{linkText}</Link></p>
    </form>
  )
}