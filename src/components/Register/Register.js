import Form from "../Form/Form";
import useValidation from "../../hooks/useValidation";
export default function Register({onRegister}) {
  const { values, errors, isValid, handleChange } = useValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values)
  }

  return (
    <Form
      name="regForm"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      captionText="Уже зарегистрированы?"
      linkText="Войти"
      path="/signin"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="form__label" htmlFor="name">
        Имя
      </label>
      <input
        className="form__input form__input_field_name"
        name="name"
        type="text"
        required
        minLength="2"
        maxLength="30"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="form__error">{errors.name}</span>
      <label className="form__label" htmlFor="email">
        E-mail
      </label>
      <input
        className="form__input form__input_field_email"
        name="email"
        type="email"
        required
        value={values.email || ""}
        onChange={handleChange}
      />
      <span className="form__error">{errors.email}</span>
      <label className="form__label" htmlFor="password">
        Пароль
      </label>
      <input
        className="form__input form__input_field_password"
        name="password"
        type="password"
        required
        minLength="8"
        value={values.password || ""}
        onChange={handleChange}
      />
      <span className="form__error">{errors.password}</span>
    </Form>
  );
}
