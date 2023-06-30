import React from 'react';
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';
import { filterByDuration } from '../../utils/utils';
export default function FilterCheckbox({checkboxChecked, setCheckboxChecked, movies, setMoviesToRender, setSavedMoviesToRender}) {
  const location = useLocation();

  function handleClick() {
    setCheckboxChecked(checkboxChecked => !checkboxChecked);
      const result = checkboxChecked
      ? movies.filter(item => filterByDuration(item))
      : movies;
    location.pathname === '/movies' ? setMoviesToRender(result) : setSavedMoviesToRender(result)
  }

  return(
    <label className="searchForm__checkbox">
      <input type="checkbox" onChange={handleClick} checked={checkboxChecked}/>
      <span className="tumbler"></span>
      Короткометражки
    </label>
  )
}