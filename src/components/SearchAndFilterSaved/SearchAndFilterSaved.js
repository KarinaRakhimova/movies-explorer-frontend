import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesList from "../SavedMoviesList/SavedMoviesList";
import useValidation from "../../hooks/useValidation";
import { searchByUserRequest, handleFilter } from "../../utils/utils";
import { getSavedMovies } from "../../utils/MainApi";
export default function SearchAndFilterSaved({
  savedMovies,
  deleteMovie,
  setReqStatus,
  setMessage,
  setIsOpen,
  setIsLoading,
}) {
  const { values, setValues, handleChange } =
    useValidation({});
  const [checkboxChecked, setCheckboxChecked] = React.useState(false); //состояние фильтра короткометражек
  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState([]); // результаты поиска
  const [savedMoviesToRender, setSavedMoviesToRender] = React.useState([]); // фильмы ддля рендера

  React.useEffect(() => {
    if (!values.movie) {
      const filterResult = handleFilter(checkboxChecked, savedMovies);
      setSavedMoviesToRender(filterResult);
    } else {
      if (
        localStorage.getItem("userRequestSaved") &&
        values.movie === JSON.parse(localStorage.getItem("userRequestSaved"))
      ) {
    const userRequest = JSON.parse(localStorage.getItem("userRequestSaved"));
    const searchResult = searchByUserRequest(userRequest, savedMovies);
      setSearchedSavedMovies(searchResult);
      const filterResult = handleFilter(checkboxChecked, searchResult);
      setSavedMoviesToRender(filterResult);
      } else {
        return;
      }
    }
  }, [checkboxChecked, savedMovies]);

  function handleSearchInSavedMovies(userRequest) {
    if (!userRequest) {
      setSavedMoviesToRender(savedMovies);
    } else {
      setIsLoading(true);
      let searchResult, filterResult;
      if (savedMovies) {
        localStorage.setItem("userRequestSaved", JSON.stringify(userRequest));
        searchResult = searchByUserRequest(userRequest, savedMovies);
        setSearchedSavedMovies(searchResult);
        filterResult = handleFilter(checkboxChecked, searchResult);
        setSavedMoviesToRender(filterResult);
        setIsLoading(false);
        if (filterResult.length === 0) {
          setReqStatus(false);
          setMessage("Ничего не найдено");
          setIsOpen(true);
        }
      } else {
        getSavedMovies()
          .then((res) => {
            localStorage.setItem("savedMoviesList", JSON.stringify(res));
            searchResult = searchByUserRequest(userRequest, res);
            setSearchedSavedMovies(searchResult);
            filterResult = handleFilter(checkboxChecked, searchResult);
            setSavedMoviesToRender(filterResult);
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
        onSubmit={handleSearchInSavedMovies}
        checkboxChecked={checkboxChecked}
        setCheckboxChecked={setCheckboxChecked}
        values={values}
        setValues={setValues}
        handleChange={handleChange}
      />
      <SavedMoviesList
        savedMoviesToRender={savedMoviesToRender}
        deleteMovie={deleteMovie}
      />
    </section>
  );
}
