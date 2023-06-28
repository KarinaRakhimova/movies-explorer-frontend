import React from "react";
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
import { BASE_URL } from "../../utils/MoviesApi";
// custom hook
import useValidation from "../../hooks/useValidation";
// functions
import * as mainApi from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import {setDuration, filterByDuration, filterByUserRequest} from '../../utils/utils';

function App() {

  const { values, errors, isValid, handleChange } = useValidation({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [reqStatus, setReqStatus] = React.useState(true);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(),mainApi.getSavedMovies()])
      .then(([user, savedMoviesList]) => {
        setCurrentUser(user);
        setSavedMovies(savedMoviesList);
      })
      .catch(err => console.log(`Ошибка ${err}`))
    }
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);
  // регистрация
  function handleRegister(inputValues) {
    mainApi
      .register(inputValues)
      .then((res) => {
        setReqStatus(true);
        setIsOpen(true);
        setMessage("Вы успешно зарегистрировались");
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setReqStatus(false);
        setIsOpen(true);
        setMessage("Что-то пошло не так!Попробуйте ещё раз.")
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
          setIsOpen(true);
          setReqStatus(true);
          setMessage("Данные успешно обновлены");
        }
        return;
      })
      .catch((err) => {
        console.log(err);
        setReqStatus(false);
      })
  }

  function checkToken() {
    mainApi
      .getToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }
  function closePopup() {
    setIsOpen(false);
  }
  // выход из учетной записи
  function handleSignout() {
    mainApi
      .signout()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err))
  }


  function handleSearch(someRequest) {
    if (!isValid) {
      setIsOpen(true);
      setReqStatus(false);
      setMessage("Нужно ввести ключевое слово")
      return;
    }
    setIsLoading(true);
    getMovies()
      .then((res) => {
        const filteredMovies = checkboxChecked
        ? res.filter((item) => filterByUserRequest(someRequest, item)).filter(item => filterByDuration(item))
        : res.filter((item) => filterByUserRequest(someRequest, item))
        if (filteredMovies.length === 0) {
          setIsOpen(true);
          setReqStatus(false);
          setMessage("Ничего не найдено");
        }
        setMovies(filteredMovies);
        setMoviesToRender(filteredMovies.slice(0, 16))
        localStorage.setItem("lastSearch", JSON.stringify(filteredMovies));
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

  function handleSearchInSavedMovies(someRequest) {
    if (!isValid) {
      setIsOpen(true);
      setReqStatus(false);
      setMessage("Нужно ввести ключевое слово")
      return;
    }
    setIsLoading(true);
    const filteredMovies = checkboxChecked
        ? savedMovies.filter((item) => filterByUserRequest(someRequest, item)).filter(item => filterByDuration(item))
        : savedMovies.filter((item) => filterByUserRequest(someRequest, item))
        if (filteredMovies.length === 0) {
          setIsOpen(true);
          setReqStatus(false);
          setMessage("Ничего не найдено");
        }
        setSavedMovies(filteredMovies);
        setIsLoading(false)
  }

  function saveMovie(movie) {
    mainApi
      .saveMovie({
        ...movie,
        image: `${BASE_URL}${movie.image.url}`,
        thumbnail: `${BASE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      })
      .catch((err) => console.log(err));
  }

  function deleteMovie(movie) {
    mainApi
      .deleteMovie(movie.id || movie.movieId)
      .then(() => {
        setSavedMovies((newCards) =>
          newCards.filter((card) => card._id !== movie._id)
        );
        setIsOpen(true);
        setReqStatus(true);
        setMessage("Фильм успешно удален");
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
                  moviesToRender={moviesToRender}
                  setMoviesToRender={setMoviesToRender}
                  checkboxChecked={checkboxChecked}
                  setCheckboxChecked={setCheckboxChecked}
                  handleSearch={handleSearch}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  setDuration={setDuration}
                  values={values}
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
                  setSavedMovies={setSavedMovies}
                  setMoviesToRender={setMoviesToRender}
                  checkboxChecked={checkboxChecked}
                  setCheckboxChecked={setCheckboxChecked}
                  setDuration={setDuration}
                  deleteMovie={deleteMovie}
                  values={values}
                  errors={errors}
                  isValid={isValid}
                  handleChange={handleChange}
                  movies={savedMovies}
                  setMovies={setMovies}
                  handleSearchInSavedMovies={handleSearchInSavedMovies}
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
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <InfoPopup
          isOpen={isOpen}
          onClose={closePopup}
          reqStatus={reqStatus}
          message={message}
        />
        <PreloaderPopup isLoading={isLoading}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
