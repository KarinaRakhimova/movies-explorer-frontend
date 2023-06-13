import "./MoviesCard.css";
import React from "react";
export default function MoviesCard() {
  const [ isLiked, setIsLiked ] = React.useState(false);
  function handleLikeClick() {
    setIsLiked(true);
  }
  return (
    <li className="movies__card">
      <figure className="card">
        <img
          src="https://images.unsplash.com/photo-1519985397845-b6f5188870af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXwzMzI4OTk4OHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
          alt="постер фильма"
          className="card__poster"/>
        <figcaption className="card__description">
          <p className="card__name">Жизнь Пи</p>
          <button
            className={`card__like button ${isLiked ? "card__like_active" : ""}`}
            aria-label="лайк"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="card__duration">1ч42м</p>
        </figcaption>
      </figure>
    </li>
  );
}
