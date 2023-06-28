import React from "react";
import searchFormIcon from "../../images/searchFormIcon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  onSubmit,
  checkboxChecked,
  setCheckboxChecked,
  values,
  handleChange,
  movies, setSavedMovies, setMoviesToRender
}) {
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
        setSavedMovies={setSavedMovies}
        setMoviesToRender={setMoviesToRender}
      />
    </form>
  );
}
