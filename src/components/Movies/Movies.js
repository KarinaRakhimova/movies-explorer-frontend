import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import { BASE_URL } from "../../utils/MoviesApi";
import { checkSavedMoviesInLocalStorage } from "../../utils/utils";
import { getSavedMovies } from "../../utils/MainApi";
export default function Movies({
  movies,
  moviesToRender,
  setMoviesToRender,
  setMovies,
  checkboxChecked,
  setCheckboxChecked,
  handleSearch,
  saveMovie,
  deleteMovie,
  setDuration,
  values, errors, isValid, handleChange
}) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const amount = windowWidth >=1280 ? 16 : 8;
  const step = windowWidth >=1280 ? 4 : 2;
  // const [moviesToRender, setMoviesToRender] = React.useState([]);


  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  React.useEffect(() => {
    // values.movie = JSON.parse(localStorage.getItem("userRequest")).movie || "";
    const cashedMovies = JSON.parse(localStorage.getItem("lastSearch")) || [];
    setCheckboxChecked(JSON.parse(localStorage.getItem("shortMoviesFilterOn")) || false);
    getSavedMovies()
    .then(res => {
      checkSavedMoviesInLocalStorage(cashedMovies, res);
      setMovies(cashedMovies);
      setMoviesToRender(cashedMovies.slice(0, amount))
    })
    .catch(err => console.log(err))

  }, [windowWidth]);

  function handleClick() {
    const start = moviesToRender.length
    setMoviesToRender([...moviesToRender, ...movies.slice(start, start+step)])
  }
  const moviesList = moviesToRender.map((movie) => (
    <MoviesCard
      key={movie.id}
      movie={movie}
      imageUrl={`${BASE_URL}${movie.image.url}`}
      nameRU={movie.nameRU}
      duration={setDuration(movie.duration)}
      saveMovie={saveMovie}
      deleteMovie={deleteMovie}
      isLiked = {movie.isLiked || false}
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
        movies={movies}
        setMoviesToRender={setMoviesToRender}
      />
      <ul className="movies__list">{moviesList}</ul>
      <button type="button" className="movies__search button" onClick={handleClick}
      hidden={(movies.length - moviesToRender.length ===0) ? true : false}>
        Еще
      </button>
    </section>
  );
}
