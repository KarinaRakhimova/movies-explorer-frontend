import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
export default function MoviesCard({
  movie,
  imageUrl,
  nameRU,
  duration,
  saveMovie,
  deleteMovie,
}) {
  const location = useLocation();
  const [isLiked, setIsLiked] = React.useState(movie.isLiked || false);

  function handleLikeClick() {
    setIsLiked(true);
    saveMovie(movie);
  }

  function handleDislikeClick() {
    setIsLiked(false);
    deleteMovie(movie);
  }

  return (
    <li className="movies__card">
      <figure className="card">
        <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} alt="постер фильма" className="card__poster" />
        </a>
        <figcaption className="card__description">
          <p className="card__name">{nameRU}</p>
          {location.pathname === "/movies" ? (
            <button
              className={`card__like button ${
                isLiked ? "card__like_active" : ""
              }`}
              aria-label="лайк"
              type="button"
              onClick={
                isLiked
                  ? () => handleDislikeClick(movie)
                  : () => handleLikeClick(movie)
              }
            ></button>
          ) : (
            <button
              className="card__delete button"
              aria-label="удалить"
              type="button"
              onClick={() => handleDislikeClick(movie)}
            ></button>
          )}
          <p className="card__duration">{duration}</p>
        </figcaption>
      </figure>
    </li>
  );
}
