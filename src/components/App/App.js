import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
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
// functions
import * as mainApi from "../../utils/MainApi";

function App() {
  function checkResStatus(resStatus) {
    switch (resStatus) {
      case "401":
        setMessage("Вы ввели неправильный логин или пароль");
        break;
      case "403":
        setMessage("У вас нет доступа");
        break;
      case "409":
        setMessage("Пользователь с таким email уже существует");
        break;
      case "404":
        setMessage("404 Страница по указанному маршруту не найдена");
        break;
      default:
        setMessage("500 На сервере произошла ошибка");
    }
  }

  const navigate = useNavigate();
  const location = useLocation();
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
  // сохраненные фильмы
  const [savedMovies, setSavedMovies] = React.useState([]);
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
        console.log(err);
        checkResStatus(err);
        setLoggedIn(false);
        setReqStatus(false);
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
      })
      .catch((err) => {
        console.log(err);
        checkResStatus(err);
        setLoggedIn(false);
        setReqStatus(false);
        setIsOpen(true);
      });
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
      })
      .catch((err) => {
        console.log(err);
        checkResStatus(err);
        setLoggedIn(false);
        setReqStatus(false);
        setIsOpen(true);
      });
  }

  // проверка токена
  const checkToken = () => {
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
  };

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
    setReqStatus(true);
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
        .catch((err) => {
          console.log(err);
          checkResStatus(err);
          setLoggedIn(false);
          setReqStatus(false);
          setIsOpen(true);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  }, [loggedIn]);

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
      .catch((err) => {
        console.log(err);
        checkResStatus(err);
        setLoggedIn(false);
        setReqStatus(false);
        setIsOpen(true);
      });
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
      .catch((err) => {
        console.log(err);
        checkResStatus(err);
        setLoggedIn(false);
        setReqStatus(false);
        setIsOpen(true);
      });
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
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  setIsLoading={setIsLoading}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  savedMovies={savedMovies}
                  setReqStatus={setReqStatus}
                  setMessage={setMessage}
                  setIsOpen={setIsOpen}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  deleteMovie={deleteMovie}
                  setIsLoading={setIsLoading}
                  setReqStatus={setReqStatus}
                  setMessage={setMessage}
                  setIsOpen={setIsOpen}
                />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <>
                <Header loggedIn={loggedIn} />
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
                <Header loggedIn={loggedIn} />
                <Login onLogin={handleLogin} loggedIn={loggedIn} />
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <Header loggedIn={loggedIn} />
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
