import Form from "../Form/Form";
import InputElement from "../Input/Input";
export default function Register() {
  return(
    <Form name="regForm" title="Добро пожаловать!" buttonText="Зарегистрироваться" captionText="Уже зарегистрированы?" linkText="Войти" path="/signin">
      <InputElement field="name" label="Имя" type="text"/>
      <InputElement field="email" label="E-mail" type="email"/>
      <InputElement field="password" label="Пароль" type="password"/>
    </Form>
  );
}