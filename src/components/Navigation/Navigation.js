import { useLocation, Link } from "react-router-dom";
import Menu from "../Menu/Menu";
export default function Navigation(isActive) {
  const location = useLocation();
  const navElements = () => {
    if (location.pathname === "/") {
      return (
        <nav className="header__container">
          <Link to="/signup" className="header__link header__link_type_signup link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__link header__link_type_signin link">
            Войти
          </Link>
        </nav>
      );
    } else if (
      location.pathname === "/movies" ||
      location.pathname === "/profile" ||
      location.pathname === "/saved-movies"
    ) {
      return (
        <Menu/>
      );
    }
    return null;
  };

  return navElements();
}
