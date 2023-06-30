import Form from "../Form/Form";
import useValidation from "../../hooks/useValidation";
export default function Login({ onLogin }) {
  const { values, errors, isValid, handleChange } = useValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values)
  }
  return (
    <Form
      name="loginForm"
      title="Рады видеть!"
      buttonText="Войти"
      captionText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      path="/signup"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="form__label" htmlFor="email">
        E-mail
      </label>
      <input
        className="form__input form__input_field_email"
        type="email"
        name="email"
        required
        value={values.email || ""}
        onChange={handleChange}
      />
      <span className="form__error">{errors.email}</span>
      <label className="form__label" htmlFor="Пароль">
        Пароль
      </label>
      <input
        className="form__input form__input_field_password"
        type="password"
        name="password"
        required
        minLength="8"
        value={values.password || ""}
        onChange={handleChange}
      />
      <span className="form__error">{errors.password}</span>
    </Form>
  );
}
