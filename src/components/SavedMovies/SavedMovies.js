import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";
import { getSavedMovies } from "../../utils/MainApi";
export default function SavedMovies({
  handleSearch,
  savedMovies,
  setSavedMovies,
  checkboxChecked,
  setCheckboxChecked,
  setDuration,
  deleteMovie,
  values, errors, isValid, handleChange,setMoviesToRender
}) {
  React.useEffect(() => {
    getSavedMovies()
      .then((res) => {

          console.log(res);
        setSavedMovies(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const moviesList = savedMovies.map((movie) => (
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
        errors={errors}
        isValid={isValid}
        handleChange={handleChange}
        movies={savedMovies}
        setSavedMovies={setSavedMovies}
        setMoviesToRender={setMoviesToRender}
      />
      <ul className="movies__list">{moviesList}</ul>
    </section>
  );
}
