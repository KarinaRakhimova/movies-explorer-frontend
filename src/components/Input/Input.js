export default function InputElement({field, label, type}) {
  return (
    <>
      <label className="form__label" for={field}>{label}</label>
      <input className={`form__input form__input_field_${field}`} type={type} id={field} required/>
      <span className="form__error"></span>
    </>

  )
}