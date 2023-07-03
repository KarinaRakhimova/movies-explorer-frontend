import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import { BASE_URL_MOVIE_SERVER } from "../../utils/constants";
import { checkSavedMoviesInLocalStorage, setDuration } from "../../utils/utils";
export default function Movies({movies, setMovies, values, setValues, handleChange, errors, isValid,
  handleSearch, saveMovie, deleteMovie, checkboxChecked, setCheckboxChecked}) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [moviesToRender, setMoviesToRender] = React.useState([]);

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
    const cashedMovies = JSON.parse(localStorage.getItem("searchResult")) || [];
    const likedMovies = JSON.parse(localStorage.getItem("savedMoviesList"))|| [];
    checkSavedMoviesInLocalStorage(cashedMovies, likedMovies)
    setMovies(cashedMovies)
    setMoviesToRender(cashedMovies);
  }, [])

  React.useEffect(() => {
    let amount;
    amount = windowWidth >= 1280 ? 16 : 8;
    const cashedMovies = JSON.parse(localStorage.getItem("searchResult")) || [];
    const likedMovies = JSON.parse(localStorage.getItem("savedMoviesList"))|| [];
    checkSavedMoviesInLocalStorage(cashedMovies, likedMovies)
    setMoviesToRender(cashedMovies.slice(0, amount))
  }, [windowWidth, movies])

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
  />));


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
