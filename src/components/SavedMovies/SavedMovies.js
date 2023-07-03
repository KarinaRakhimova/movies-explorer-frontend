import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";
import { setDuration } from "../../utils/utils";
export default function SavedMovies({
  values,
  setValues,
  handleChange,
  isValid,
  handleSearch,
  savedMovies,
  savedMoviesToRender,
  setSavedMoviesToRender,
  deleteMovie,
  checkboxChecked,
  setCheckboxChecked,
}) {
  React.useEffect(() => {
    setSavedMoviesToRender(savedMovies);
  }, [savedMovies, isValid]);

  const moviesList = savedMoviesToRender.map((movie) => (
    <MoviesCard
      key={movie.movieId}
      movie={movie}
      imageUrl={movie.image}
      nameRU={movie.nameRU}
      duration={setDuration(movie.duration)}
      deleteMovie={deleteMovie}
    />
  ));
  return (
    <section className="movies">
      <SearchForm
        onSubmit={handleSearch}
        checkboxChecked={checkboxChecked}
        setCheckboxChecked={setCheckboxChecked}
        values={values}
        setValues={setValues}
        isValid={isValid}
        handleChange={handleChange}
      />
      <ul className="movies__list">{moviesList}</ul>
    </section>
  );
}
