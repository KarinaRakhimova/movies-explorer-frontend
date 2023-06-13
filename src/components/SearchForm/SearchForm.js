import searchFormIcon from '../../images/searchFormIcon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
export default function SearchForm() {
  return (
    <form name="searchForm" className="searchForm">
      <img
        className="searchForm__icon"
        src={searchFormIcon}
        alt="иконка поиска"
      />
      <input className="searchForm__input" type="text" placeholder="Фильм" />
      <button className="searchForm__button button" type="submit">
        Найти
      </button>
      <FilterCheckbox />
    </form>
  );
}
