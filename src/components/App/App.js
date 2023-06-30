import React, { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import {
  setDuration,
  filterByDuration,
  filterByUserRequest,
} from "../../utils/utils";

function App() {
  const navigate = useNavigate();
  // валидация форм
  const { values, setValues, errors, isValid, handleChange } = useValidation({});
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
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesToRender, setSavedMoviesToRender] = React.useState([]);
  //состояние фильтра короткометражек
  const [checkboxChecked, setCheckboxChecked] = React.useState(JSON.parse(localStorage.getItem("shortMoviesFilterOn")) || false);
  // сообщение, которое попадает в инфопопап
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, savedMoviesList]) => {
          setCurrentUser(user);
          setSavedMovies(savedMoviesList);
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }, [loggedIn]);

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
      })
  }
  // проверка токена
  const checkToken = useCallback(() => {
    mainApi
    .getToken()
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies', { replace: true });
      }
    })
    .catch((err) => console.log(err));
  }, [])

  React.useEffect(() => {
    checkToken();
  }, []);
  // выход из учетной записи
  function handleSignout() {
    mainApi
      .signout()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          navigate("/", { replace: true });
          localStorage.clear();
          setReqStatus(true);
          setMessage("Вы вышли из учетной записи");
          setIsOpen(true);
        }
      })
      .catch((err) => console.log(err))
  }
  // закрыть инфопопап
  function closePopup() {
    setIsOpen(false);
    setMessage("");
  }

  // поиск по фильмам
  function handleSearch(someRequest) {
    // проверка формы поиска на валидность
    if (!someRequest) {
      setIsOpen(true);
      setReqStatus(false);
      setMessage("Нужно ввести ключевое слово");
      return;
    }
    // запуск прелоадера
    setIsLoading(true);
    let filteredMovies;
    // проверка фильмов в localStorage
    if (localStorage.getItem("lastSearch")) {
      const cashedMovies = JSON.parse(localStorage.getItem("lastSearch"));
      filteredMovies = checkboxChecked
        ? cashedMovies
            .filter((item) => filterByUserRequest(someRequest, item))
            .filter((item) => filterByDuration(item))
        : cashedMovies.filter((item) => filterByUserRequest(someRequest, item));
        if (filteredMovies.length === 0) {
          setIsOpen(true);
          setReqStatus(false);
          setMessage("Ничего не найдено");
        }
        setMovies(filteredMovies);
        setMoviesToRender(filteredMovies.slice(0, 16));
        setIsLoading(false);
        localStorage.setItem("userRequest", JSON.stringify(someRequest));
    }
    // запрос к серверу если в localStorage пусто
    else {
      getMovies()
      .then((res) => {
        localStorage.setItem("lastSearch", JSON.stringify(res))
        filteredMovies = checkboxChecked
        ? res
            .filter((item) => filterByUserRequest(someRequest, item))
            .filter((item) => filterByDuration(item))
        : res.filter((item) => filterByUserRequest(someRequest, item));
        if (filteredMovies.length === 0) {
          setIsOpen(true);
          setReqStatus(false);
          setMessage("Ничего не найдено");
        }
        setMovies(filteredMovies);
        setMoviesToRender(filteredMovies.slice(0, 16));
        localStorage.setItem("userRequest", JSON.stringify(someRequest));
        localStorage.setItem("shortMoviesFilterOn",JSON.stringify(checkboxChecked));
      })
      .catch((err) => {
        setReqStatus(false);
        setIsOpen(true);
        setMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }
  // поиск по сохраненным фильмам
  function handleSearchInSavedMovies(someRequest) {
    // проверка формы поиска на валидность
    if (!someRequest) {
      setIsOpen(true);
      setReqStatus(false);
      setMessage("Нужно ввести ключевое слово");
      return;
    }
    // запуск прелоадера
    setIsLoading(true);
    const filteredMovies = checkboxChecked
      ? savedMovies
          .filter((item) => filterByUserRequest(someRequest, item))
          .filter((item) => filterByDuration(item))
      : savedMovies.filter((item) => filterByUserRequest(someRequest, item));
    if (filteredMovies.length === 0) {
      setIsOpen(true);
      setReqStatus(false);
      setMessage("Ничего не найдено");
    }
    setSavedMoviesToRender(filteredMovies);
    setIsLoading(false);
  }

  // добавить фильм в сохраненные
  function saveMovie(movie) {
    mainApi
      .saveMovie({
        ...movie,
        image: `${BASE_URL_MOVIE_SERVER}${movie.image.url}`,
        thumbnail: `${BASE_URL_MOVIE_SERVER}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      })
      .then(res => setSavedMovies([...savedMovies, res]))
      .catch((err) => console.log(err));
  }
  // удалить из сохраненных
  function deleteMovie(movie) {
    mainApi
      .deleteMovie(movie.id || movie.movieId)
      .then(() => {
        setSavedMovies((newCards) =>
          newCards.filter((card) => card._id !== movie._id)
        );
        setMessage("Фильм успешно удален");
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
                  moviesToRender={moviesToRender}
                  setMoviesToRender={setMoviesToRender}
                  checkboxChecked={checkboxChecked}
                  setCheckboxChecked={setCheckboxChecked}
                  handleSearch={handleSearch}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  setDuration={setDuration}
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
                  movies={savedMovies}
                  savedMovies={savedMovies}
                  savedMoviesToRender={savedMoviesToRender}
                  setSavedMovies={setSavedMovies}
                  setSavedMoviesToRender={setSavedMoviesToRender}
                  checkboxChecked={checkboxChecked}
                  setCheckboxChecked={setCheckboxChecked}
                  setDuration={setDuration}
                  deleteMovie={deleteMovie}
                  values={values}
                  setValues={setValues}
                  errors={errors}
                  isValid={isValid}
                  handleChange={handleChange}
                  handleSearch={handleSearchInSavedMovies}
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
                <Login onLogin={handleLogin} />
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <Header />
                <Register onRegister={handleRegister} />
              </>
            }
          ></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
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
