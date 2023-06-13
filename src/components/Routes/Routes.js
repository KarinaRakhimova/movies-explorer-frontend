import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Footer from "../Footer/Footer";
export default function RoutesElement() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
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
            <Movies />
            <Footer />
          </>
        }
      />
      <Route
        path="/saved-movies"
        element={
          <>
            <Header />
            <SavedMovies />
            <Footer />
          </>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <>
            <Header />
            <Profile />
          </>
        }
      ></Route>
      <Route
        path="/signin"
        element={
          <>
            <Header />
            <Login />
          </>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <>
            <Header />
            <Register />
          </>
        }
      ></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}
