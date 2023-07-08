import React from "react";
import { useLocation } from "react-router-dom";
import "./FilterCheckbox.css";
export default function FilterCheckbox({
  checkboxChecked,
  setCheckboxChecked,
}) {
  function handleClick() {
    setCheckboxChecked((checkboxChecked) => !checkboxChecked);
  }

  return (
    <label className="searchForm__checkbox">
      <input type="checkbox" checked={checkboxChecked} onChange={handleClick} />
      <span className="tumbler"></span>
      Короткометражки
    </label>
  );
}
