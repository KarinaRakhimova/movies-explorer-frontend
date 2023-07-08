import MoviesCard from "../MoviesCard/MoviesCard";
import { setDuration } from "../../utils/utils";
export default function SavedMoviesList({ savedMovies, savedMoviesToRender, deleteMovie }) {

  const moviesList = savedMoviesToRender.map((movie) => (
    <MoviesCard
      movie={movie}
      key={movie.movieId}
      imageUrl={movie.image}
      nameRU={movie.nameRU}
      duration={setDuration(movie.duration)}
      deleteMovie={deleteMovie}
    />
  ));
  return <ul className="movies__list">{moviesList}</ul>;
}
