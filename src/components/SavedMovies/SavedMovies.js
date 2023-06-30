import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";
import { filterByDuration } from "../../utils/utils";
export default function SavedMovies({
  handleSearch,
  savedMovies,
  setSavedMovies,
  checkboxChecked,
  setCheckboxChecked,
  setDuration,
  deleteMovie,
  values,
  setValues,
  isValid,
  handleChange,
  savedMoviesToRender,
  setSavedMoviesToRender,
}) {
  React.useEffect(() => {
    checkboxChecked ?
    setSavedMoviesToRender(savedMovies.filter((item => filterByDuration(item)))) : setSavedMoviesToRender(savedMovies);
  }, [savedMovies, isValid, checkboxChecked]);

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
        movies={savedMoviesToRender}
        setSavedMovies={setSavedMovies}
        setSavedMoviesToRender={setSavedMoviesToRender}
      />
      <ul className="movies__list">{moviesList}</ul>
    </section>
  );
}
