import React from "react";
import { useForm } from "../../hooks/useForm";
export default function InputElement({ name, label, type }) {
  const { values, handleChange } = useForm({});

  return (
    <>
      <label className="form__label" htmlFor={name}>
        {label}
      </label>
      <input
        className={`form__input form__input_field_${name}`}
        type={type}
        name={name}
        required
        value={values.name}
        onChange={handleChange}
      />
      <span className="form__error"></span>
    </>
  );
}
