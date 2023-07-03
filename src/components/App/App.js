import React, { useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoPopup from "../InfoPopup/InfoPopup";
import PreloaderPopup from "../PreloaderPopup";
// context
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// constants
import { BASE_URL_MOVIE_SERVER } from "../../utils/constants";
// custom hook
import useValidation from "../../hooks/useValidation";
// functions
import * as mainApi from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import { filterByDuration, filterByUserRequest } from "../../utils/utils";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // валидация форм
  const { values, setValues, errors, isValid, setIsValid, handleChange } =
    useValidation({});
  // состояние прелоадера
  const [isLoading, setIsLoading] = React.useState(false);
  // состояние инфопопапа
  const [isOpen, setIsOpen] = React.useState(false);
  // залогиненный пользователь
  const [currentUser, setCurrentUser] = React.useState({});
  // состояние авторизации
  const [loggedIn, setLoggedIn] = React.useState(false);
  // статус запроса на api - успешен или нет
  const [reqStatus, setReqStatus] = React.useState(true);
  // фильмы/сохраненные фильмы/для отрисовки частями
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesToRender, setSavedMoviesToRender] = React.useState([]);
  //состояние фильтра короткометражек
  const [checkboxChecked, setCheckboxChecked] = React.useState(
    JSON.parse(localStorage.getItem("shortMoviesFilterOn")) || false
  );
  // сообщение, которое попадает в инфопопап
  const [message, setMessage] = React.useState("");

  // регистрация
  function handleRegister(inputValues) {
    mainApi
      .register(inputValues)
      .then((res) => {
        setLoggedIn(true);
        setReqStatus(true);
        setMessage("Вы успешно зарегистрировались");
        setIsOpen(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setReqStatus(false);
        setMessage("Что-то пошло не так!Попробуйте ещё раз.");
        setIsOpen(true);
      });
  }

  // авторизация
  function handleLogin(inputValues) {
    mainApi
      .login(inputValues)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate("/movies", { replace: true });
        }
        return;
      })
      .catch((err) => console.log(err));
  }

  // обновление данных пользователя
  function handleUpdateUser(inputValues) {
    mainApi
      .updateUser(inputValues)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setReqStatus(true);
          setMessage("Данные успешно обновлены");
          setIsOpen(true);
        }
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // проверка токена
  const checkToken = useCallback(() => {
    mainApi
      .getToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate(location.pathname, { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // выход из учетной записи
  function handleSignout() {
    mainApi
      .signout()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          localStorage.clear();
          navigate("/", { replace: true });
          setReqStatus(true);
          setMessage("Вы вышли из учетной записи");
          setIsOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }
  // закрыть инфопопап
  function closePopup() {
    setIsOpen(false);
    setMessage("");
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, savedMoviesList]) => {
          setCurrentUser(user);
          setSavedMovies(savedMoviesList);
          localStorage.setItem(
            "savedMoviesList",
            JSON.stringify(savedMoviesList)
          );
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  }, [loggedIn, checkToken]);

  React.useEffect(() => {
    if (localStorage.getItem("userRequest")) {
      setIsValid(true);
    }
  }, []);

  function handleSearch(userRequest) {
    if (!isValid) {
      setMessage("Нужно ввести ключевое слово");
      setReqStatus(false);
      setIsOpen(true);
      return;
    }
    localStorage.setItem("userRequest", JSON.stringify(userRequest));
    localStorage.setItem("shortFilterOn", JSON.stringify(checkboxChecked));
    setIsLoading(true);
    let filteredMovies;
    if (localStorage.getItem("serverMovies")) {
      const cashedMovies = JSON.parse(localStorage.getItem("serverMovies"));
      filteredMovies = checkboxChecked
        ? cashedMovies
            .filter((item) => filterByDuration(item))
            .filter((item) => filterByUserRequest(userRequest, item))
        : cashedMovies.filter((item) => filterByUserRequest(userRequest, item));
      // ничего не найдено
      if (filteredMovies.length === 0) {
        setIsOpen(true);
        setReqStatus(false);
        setMessage("Ничего не найдено");
      }
      localStorage.setItem("searchResult", JSON.stringify(filteredMovies));
      setMovies(filteredMovies);
      setIsLoading(false);
    } else {
      getMovies()
        .then((res) => {
          localStorage.setItem("serverMovies", JSON.stringify(res));
          filteredMovies = checkboxChecked
            ? res
                .filter((item) => filterByDuration(item))
                .filter((item) => filterByUserRequest(userRequest, item))
            : res.filter((item) => filterByUserRequest(userRequest, item));
          if (filteredMovies.length === 0) {
            setIsOpen(true);
            setReqStatus(false);
            setMessage("Ничего не найдено");
          }
          localStorage.setItem("searchResult", JSON.stringify(filteredMovies));
          setMovies(filteredMovies);
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

  function handleSearchInSavedMovies(userRequest) {
    setIsLoading(true);
    let filteredMovies;
    if (localStorage.getItem("savedMoviesList")) {
      const cashedMovies = JSON.parse(localStorage.getItem("savedMoviesList"));
      filteredMovies = checkboxChecked
        ? cashedMovies
            .filter((item) => filterByDuration(item))
            .filter((item) => filterByUserRequest(userRequest, item))
        : cashedMovies.filter((item) => filterByUserRequest(userRequest, item));
      // ничего не найдено
      if (filteredMovies.length === 0) {
        setIsOpen(true);
        setReqStatus(false);
        setMessage("Ничего не найдено");
      }
      setSavedMoviesToRender(filteredMovies);
      setIsLoading(false);
    } else {
      mainApi
        .getSavedMovies()
        .then((res) => {
          localStorage.setItem("savedMoviesList", JSON.stringify(res));
          filteredMovies = checkboxChecked
            ? res
                .filter((item) => filterByDuration(item))
                .filter((item) => filterByUserRequest(userRequest, item))
            : res.filter((item) => filterByUserRequest(userRequest, item));
          if (filteredMovies.length === 0) {
            setIsOpen(true);
            setReqStatus(false);
            setMessage("Ничего не найдено");
          }
          setSavedMoviesToRender(filteredMovies);
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

  function saveMovie(movie) {
    mainApi
      .saveMovie({
        ...movie,
        image: `${BASE_URL_MOVIE_SERVER}${movie.image.url}`,
        thumbnail: `${BASE_URL_MOVIE_SERVER}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      })
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
        localStorage.setItem(
          "savedMoviesList",
          JSON.stringify([res, ...savedMovies])
        );
      })
      .catch((err) => console.log(err));
  }

  function deleteMovie(movie) {
    mainApi
      .deleteMovie(movie.id || movie.movieId)
      .then((res) => {
        const newSavedFilms = savedMovies.filter(
          (card) => card._id !== res._id
        );
        setSavedMovies(newSavedFilms);
        localStorage.setItem("savedMoviesList", JSON.stringify(newSavedFilms));
        setMessage("Фильм успешно удален из сохранённых фильмов");
        setReqStatus(true);
        setIsOpen(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/movies"
            element={
              <>
                <Header />
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  movies={movies}
                  setMovies={setMovies}
                  savedMovies={savedMovies}
                  checkboxChecked={checkboxChecked}
                  setCheckboxChecked={setCheckboxChecked}
                  handleSearch={handleSearch}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  values={values}
                  setValues={setValues}
                  errors={errors}
                  isValid={isValid}
                  handleChange={handleChange}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header />
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  savedMoviesToRender={savedMoviesToRender}
                  setSavedMoviesToRender={setSavedMoviesToRender}
                  handleSearch={handleSearchInSavedMovies}
                  deleteMovie={deleteMovie}
                  values={values}
                  setValues={setValues}
                  isValid={isValid}
                  handleChange={handleChange}
                  checkboxChecked={checkboxChecked}
                  setCheckboxChecked={setCheckboxChecked}
                />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  reqStatus={reqStatus}
                  onSignout={handleSignout}
                />
              </>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <>
                <Header />
                <Login onLogin={handleLogin} loggedIn={loggedIn} />
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <Header />
                <Register onRegister={handleRegister} loggedIn={loggedIn} />
              </>
            }
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <PreloaderPopup isLoading={isLoading} />
        <InfoPopup
          reqStatus={reqStatus}
          message={message}
          isOpen={isOpen}
          onClose={closePopup}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
