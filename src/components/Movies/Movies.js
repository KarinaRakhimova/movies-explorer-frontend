import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import { BASE_URL_MOVIE_SERVER } from "../../utils/constants";
import { checkSavedMoviesInLocalStorage, filterByDuration } from "../../utils/utils";
export default function Movies({
  movies,
  savedMovies,
  setMovies,
  moviesToRender,
  setMoviesToRender,
  checkboxChecked,
  setCheckboxChecked,
  handleSearch,
  saveMovie,
  deleteMovie,
  setDuration,
  values,
  setValues,
  errors,
  isValid,
  handleChange,
}) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);

  React.useEffect(() => {
    let amount;
    amount = windowWidth >= 1280 ? 16 : 8;
    const cashedMovies = JSON.parse(localStorage.getItem("lastSearch")) || [];
    checkSavedMoviesInLocalStorage(cashedMovies, savedMovies);
    setMovies(cashedMovies);
    checkboxChecked
    ? setMoviesToRender(cashedMovies.filter((item => filterByDuration(item))).slice(0, amount))
    : setMoviesToRender(cashedMovies.slice(0,amount));
  }, [isValid, checkboxChecked, windowWidth]);

  function handleClick() {
    let step;
    step = windowWidth >= 1280 ? 4 : 2;
    const start = moviesToRender.length;
    setMoviesToRender([
      ...moviesToRender,
      ...movies.slice(start, start + step),
    ]);
  }
  const moviesList = moviesToRender.map((movie) => (
    <MoviesCard
      key={movie.id}
      movie={movie}
      imageUrl={`${BASE_URL_MOVIE_SERVER}${movie.image.url}`}
      nameRU={movie.nameRU}
      duration={setDuration(movie.duration)}
      saveMovie={saveMovie}
      deleteMovie={deleteMovie}
      isLiked={movie.isLiked}
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
        errors={errors}
        isValid={isValid}
        handleChange={handleChange}
        movies={moviesToRender}
        setMoviesToRender={setMoviesToRender}
      />
      <ul className="movies__list">{moviesList}</ul>
      <button
        type="button"
        className="movies__search button"
        onClick={handleClick}
        hidden={movies.length - moviesToRender.length === 0 ? true : false}
      >
        Еще
      </button>
    </section>
  );
}
