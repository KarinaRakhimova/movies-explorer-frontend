import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
import useValidation from "../../hooks/useValidation";
import {
  checkSavedMovies,
  handleFilter,
  searchByUserRequest,
} from "../../utils/utils";
import { getMovies } from "../../utils/MoviesApi";

export default function SearchAndFilter({
  setIsLoading,
  savedMovies,
  setReqStatus,
  setMessage,
  setIsOpen,
  saveMovie,
  deleteMovie,
}) {

  const [moviesToRender, setMoviesToRender] = React.useState([]); // фильмы ддля рендера
  const [checkboxChecked, setCheckboxChecked] = React.useState(false); //состояние фильтра короткометражек

  const { values, setValues, handleChange } =
    useValidation({});

  React.useEffect(() => {
    const cashedMovies = JSON.parse(localStorage.getItem("lastSearch")) || [];
    const likedMovies =
      JSON.parse(localStorage.getItem("savedMoviesList")) || [];
    const shortFilterOn =
      JSON.parse(localStorage.getItem("shortFilterOn")) || false;
    setCheckboxChecked(shortFilterOn);
    checkSavedMovies(cashedMovies, likedMovies);
    const filterResult = handleFilter(shortFilterOn, cashedMovies);
    setMoviesToRender(filterResult);
  }, [setMoviesToRender]);

  React.useEffect(() => {
    const cashedMovies = JSON.parse(localStorage.getItem("lastSearch")) || [];
    const likedMovies =
      JSON.parse(localStorage.getItem("savedMoviesList")) || [];
    if (!localStorage.getItem("userRequest")) {
      return;
    } else {
      if (values.movie === JSON.parse(localStorage.getItem("userRequest"))) {
        const filterResult = handleFilter(checkboxChecked, cashedMovies);
        checkSavedMovies(filterResult, likedMovies);
        setMoviesToRender(filterResult);
      } else {
        return;
      }
    }
  }, [checkboxChecked]);

  function handleSearch(userRequest) {
    if (!userRequest) {
      setReqStatus(false);
      setMessage("Нужно ввести ключевое слово");
      setIsOpen(true);
    } else {
      setIsLoading(true);
      localStorage.setItem("userRequest", JSON.stringify(userRequest));
      localStorage.setItem("shortFilterOn", checkboxChecked);
      let searchResult, filterResult;
      if (localStorage.getItem("serverMovies")) {
        const cashedMovies = JSON.parse(localStorage.getItem("serverMovies"));
        searchResult = searchByUserRequest(userRequest, cashedMovies);
        checkSavedMovies(searchResult, savedMovies);
        filterResult = handleFilter(checkboxChecked, searchResult);
        setMoviesToRender(filterResult);
        localStorage.setItem("lastSearch", JSON.stringify(searchResult));
        setIsLoading(false);
        if (filterResult.length === 0) {
          setReqStatus(false);
          setMessage("Ничего не найдено");
          setIsOpen(true);
        }
      } else {
        getMovies()
          .then((res) => {
            localStorage.setItem("serverMovies", JSON.stringify(res));
            searchResult = searchByUserRequest(userRequest, res);
            checkSavedMovies(searchResult, savedMovies);
            filterResult = handleFilter(checkboxChecked, searchResult);
            setMoviesToRender(filterResult);
            localStorage.setItem("lastSearch", JSON.stringify(searchResult));
            if (filterResult.length === 0) {
              setReqStatus(false);
              setMessage("Ничего не найдено");
              setIsOpen(true);
            }
          })
          .catch((err) => {
            setReqStatus(false);
            setMessage(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            );
            setIsOpen(true);
            console.log(err);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }

  return (
    <section className="movies">
      <SearchForm
        onSubmit={handleSearch}
        values={values}
        setValues={setValues}
        handleChange={handleChange}
        checkboxChecked={checkboxChecked}
        setCheckboxChecked={setCheckboxChecked}
      />
      <MoviesList
        moviesToRender={moviesToRender}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
      />
    </section>
  );
}
