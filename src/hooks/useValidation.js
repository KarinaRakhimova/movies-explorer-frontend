import { useState } from "react";
import { isEmail } from "validator";

export default function useValidation() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    if (name === "email" && !isEmail(value)) {
      evt.target.setCustomValidity("Заполните по образцу mail@mail.ru");
    } else {
      evt.target.setCustomValidity("");
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest("form").checkValidity());
  }
  return { values, setValues, errors, isValid, handleChange };
}
