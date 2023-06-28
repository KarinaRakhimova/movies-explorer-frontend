import "./Header.css";
import React from "react";
import headerLogo from "../../images/headerLogo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
function Header({loggedIn}) {
  const location = useLocation();
  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_type_main" : null
      } ${
        location.pathname === "/signin" || location.pathname === "/signup"
          ? "header_type_auth"
          : null
      }`}
    >
      <Link to="/" className="header__logo link">
        <img src={headerLogo} alt="логотип" />
      </Link>
      <Navigation loggedIn={loggedIn}/>
    </header>
  );
}

export default Header;
