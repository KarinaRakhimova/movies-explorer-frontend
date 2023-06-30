import React from "react";
import searchFormIcon from "../../images/searchFormIcon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
export default function SearchForm({
  onSubmit,
  checkboxChecked,
  setCheckboxChecked, values, setValues, handleChange,
  movies, setSavedMoviesToRender, setMoviesToRender
}) {

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("userRequest"))) {
      setValues({ movie: JSON.parse(localStorage.getItem("userRequest")).movie})
    } else {
      setValues({movie: values.movie})
    }
  }, []);



  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
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
        movies={movies}
        setSavedMoviesToRender={setSavedMoviesToRender}
        setMoviesToRender={setMoviesToRender}
      />
    </form>
  );
}
