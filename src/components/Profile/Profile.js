import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidation from "../../hooks/useValidation";

export default function Profile({ onUpdateUser, reqStatus, onSignout }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [disabledInput, setDisabledInput] = React.useState(true);
  const [newData, setNewData] = React.useState(false);
  const { values, setValues, handleChange, isValid, errors } = useValidation();
  React.useEffect(() => {
    setValues({name: currentUser.name, email: currentUser.email});
  }, [currentUser]);

  function checkNewData() {
    if (
      (currentUser.name !== values.name ||
        currentUser.email !== values.email) &&
      isValid
    ) {
      setNewData(true);
    }
  }
  function handleInputChange(e) {
    handleChange(e);
    checkNewData();
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <form name="authForm" className="form" onSubmit={handleSubmit}>
      <p className="form__title form__title_type_auth">{`Привет, ${currentUser.name}!`}</p>
      <div className="form__row">
        <label className="form__label form__label_type_auth" htmlFor="name">
          Имя
        </label>
        <div className="form__column">
          <span className="form__error form__error_type_auth">{errors.name}</span>
          <input
            className="form__input form__input_type_auth"
            type="text"
            name="name"
            value={values.name || ""}
            onChange={handleInputChange}
            required
            disabled={disabledInput}
          />
        </div>
      </div>
      <div className="form__row">
        <label className="form__label form__label_type_auth" htmlFor="email">
          E-mail
        </label>
        <div className="form__column">
        <input
          className="form__input form__input_type_auth"
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleInputChange}
          required
          disabled={disabledInput}
        />
        <span className="form__error form__error_type_auth">{errors.email}</span>
        </div>
      </div>

      {disabledInput ? (
        <>
          <button
            className="form__button button form__button_type_edit"
            onClick={() => setDisabledInput(false)}
          >
            Редактировать
          </button>
          <button
            onClick={onSignout}
            className="form__link form__link_type_signout link"
          >
            Выйти из аккаунта
          </button>
        </>
      ) : (
        <>
          <span className={`error_${reqStatus ? "hidden" : "visible"}`}>
            {reqStatus ? null : "При обновлении профиля произошла ошибка."}
          </span>
          <button
            className={`form__button button ${
              newData ? "" : "form__button_disabled"
            }`}
            disabled={newData ? false : true}
            type="submit"
          >
            Сохранить
          </button>
        </>
      )}
    </form>
  );
}
