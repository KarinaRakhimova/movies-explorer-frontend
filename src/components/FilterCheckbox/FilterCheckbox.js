import './FilterCheckbox.css'
export default function FilterCheckbox() {
  return(
    <label className="searchForm__checkbox">
      <input type="checkbox"/>
      <span className="tumbler"></span>
      Короткометражки
    </label>
  )
}