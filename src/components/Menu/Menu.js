import "./Menu.css";
import React from "react";
import { NavLink } from "react-router-dom";
import menuCloseIcon from "../../images/menuCloseIcon.svg";
import burgerIcon from "../../images/burgerIcon.svg";
export default function Menu() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [burgerOpened, setBurgerOpened] = React.useState(false);
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  const handleBurgerClick = () => {
    setBurgerOpened(true);
  };
  const handleBurgerClose = () => {
    setBurgerOpened(false);
  };
  const menuElement = () => {
    if (windowWidth > 768) {
      return (
        <nav className="menu">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `menu__link ${isActive ? "menu__link_active" : ""} link`
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `menu__link ${isActive ? "menu__link_active" : ""} link`
            }
          >
            Сохранённые фильмы
          </NavLink>
          <NavLink
            to="/profile"
            className="menu__link menu__link_type_profile link"
          >
            Аккаунт
          </NavLink>
        </nav>
      );
    }
    return (
      <>
        <img src={burgerIcon} alt="бургер меню" onClick={handleBurgerClick} />
        <nav className={`menu ${burgerOpened ? "" : "menu_hidden"}`}>
          <img
            src={menuCloseIcon}
            alt="иконка закрытия меню"
            className="menu__closeButton"
            onClick={handleBurgerClose}
          />
          <NavLink to="/" className="menu__link menu__link_type_main link">
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `menu__link ${isActive ? "menu__link_active" : ""} link`
            }
            onClick={handleBurgerClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `menu__link ${isActive ? "menu__link_active" : ""} link`
            }
            onClick={handleBurgerClose}
          >
            Сохранённые фильмы
          </NavLink>
          <NavLink
            to="/profile"
            className="menu__link menu__link_type_profile link"
            onClick={handleBurgerClose}
          >
            Аккаунт
          </NavLink>
        </nav>
      </>
    );
  };

  return menuElement();
}
