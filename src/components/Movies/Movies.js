import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
export default function Movies() {
  return (
<section className="movies">
      <SearchForm/>
      <ul className="movies__list">
        <MoviesCard/>
        <li className="movies__card">
          <figure className="card">
            <img
              src="https://images.unsplash.com/photo-1635863138275-d9b33299680b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXJvbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="постер фильма" className="card__poster"/>
            <figcaption className="card__description">
              <p className="card__name">Железный человек</p>
              <button className="card__like button" aria-label="лайк" type="button"></button>
              <p className="card__duration">1ч42м</p>
            </figcaption>
          </figure>
        </li>
        <li className="movies__card">
          <figure className="card">
            <img
              src="https://images.unsplash.com/photo-1635863138275-d9b33299680b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXJvbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="постер фильма" className="card__poster"/>
            <figcaption className="card__description">
              <p className="card__name">Железный человек</p>
              <button className="card__like button" aria-label="лайк" type="button"></button>
              <p className="card__duration">1ч42м</p>
            </figcaption>
          </figure>
        </li>
        <li className="movies__card">
          <figure className="card">
            <img
              src="https://images.unsplash.com/photo-1601513445498-5dbffc8d5d5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fG1vdmllc3xlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="постер фильма" className="card__poster"/>
            <figcaption className="card__description">
              <p className="card__name">Оно</p>
              <button className="card__like button" aria-label="лайк" type="button"></button>
              <p className="card__duration">1ч57м</p>
            </figcaption>
          </figure>
        </li>
        <li className="movies__card">
          <figure className="card">
            <img src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0bWFufGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="постер фильма" className="card__poster"/>
            <figcaption className="card__description">
              <p className="card__name">Бэтмен</p>
              <button className="card__like button" aria-label="лайк" type="button"></button>
              <p className="card__duration">2ч08м</p>
            </figcaption>
          </figure>
        </li>
        <li className="movies__card">
          <figure className="card">
            <img
              src="https://images.unsplash.com/photo-1579566346927-c68383817a25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHN0YXIlMjB3YXJzfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="постер фильма" className="card__poster"/>
            <figcaption className="card__description">
              <p className="card__name">Звездные войны</p>
              <button className="card__like card__like_active button" aria-label="лайк" type="button"></button>
              <p className="card__duration">1ч42м</p>
            </figcaption>
          </figure>
        </li>
      </ul>
      <button type="button" className="movies__search button">Еще</button>
    </section>
  );
}
