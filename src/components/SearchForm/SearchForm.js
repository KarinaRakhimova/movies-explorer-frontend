import React from "react";
import { useLocation } from "react-router-dom";
import searchFormIcon from "../../images/searchFormIcon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
export default function SearchForm({onSubmit, values, setValues, handleChange, checkboxChecked, setCheckboxChecked}) {

  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setValues({movie: ""})
    } else {
      if (localStorage.getItem("userRequest")) {
        const userRequest = JSON.parse(localStorage.getItem("userRequest"));
        setValues({ movie: userRequest})
      } else {
        setValues({movie:""})
      }
    }
  }, [location.pathname]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values.movie);
  }

  return (
    <form
      name="searchForm"
      className="searchForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <img
        className="searchForm__icon"
        src={searchFormIcon}
        alt="иконка поиска"
      />
      <input
        className="searchForm__input"
        type="text"
        placeholder="Фильм"
        name="movie"
        required
        value={values.movie || ""}
        onChange={handleChange}
      />
      <button
        className="searchForm__button button"
        type="submit"
      >
        Найти
      </button>
      <FilterCheckbox
        checkboxChecked={checkboxChecked}
        setCheckboxChecked={setCheckboxChecked}
      />
    </form>
  );
}
