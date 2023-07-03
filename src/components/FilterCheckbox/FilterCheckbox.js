import React from "react";
import { useLocation } from "react-router-dom";
import "./FilterCheckbox.css";
export default function FilterCheckbox({
  checkboxChecked,
  setCheckboxChecked,
}) {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setCheckboxChecked(false);
    } else {
      setCheckboxChecked(
        JSON.parse(localStorage.getItem("shortFilterOn")) || false
      );
    }
  }, []);

  function handleClick() {
    setCheckboxChecked((checkboxChecked) => !checkboxChecked);
  }

  return (
    <label className="searchForm__checkbox">
      <input type="checkbox" onChange={handleClick} checked={checkboxChecked} />
      <span className="tumbler"></span>
      Короткометражки
    </label>
  );
}
