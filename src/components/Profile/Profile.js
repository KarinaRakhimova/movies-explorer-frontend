import { Link } from "react-router-dom";

export default function Profile() {
  return(
    <form name="authForm" className="form">
    <p className="form__title form__title_type_auth">Привет, Виталий!</p>
    <div className="form__row">
      <label className="form__label form__label_type_auth" for="name">Имя</label>
      <input className="form__input form__input_type_auth" type="text" id="name" value="Виталий"/>
    </div>
    <div className="form__row">
      <label className="form__label form__label_type_auth" for="email">E-mail</label>
      <input className="form__input form__input_type_auth" type="email" id="email" value="pochta@yandex.ru"/>
    </div>
    <button className="form__button form__button_type_edit button" type="submit" disabled>Редактировать</button>
    <Link to="/signin" className="form__link form__link_type_signout link" href="#">Выйти из аккаунта</Link>
  </form>
  );
}