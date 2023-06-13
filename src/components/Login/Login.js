import Form from "../Form/Form";
import InputElement from "../Input/Input";
export default function Login() {
  return(
    <Form name="loginForm" title="Рады видеть!" buttonText="Войти" captionText="Ещё не зарегистрированы?" linkText="Регистрация" path="/signup">
      <InputElement field="email" label="E-mail" type="email"/>
      <InputElement field="password" label="Пароль" type="password"/>
    </Form>
  );
}