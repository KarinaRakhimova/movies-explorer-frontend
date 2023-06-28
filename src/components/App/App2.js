import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function App() {
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  return(

    <FilterCheckbox checkboxChecked={checkboxChecked} setCheckboxChecked={setCheckboxChecked}/>
  )
}