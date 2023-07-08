import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { BASE_URL_MOVIE_SERVER } from "../../utils/constants";
import { setDuration, calculateRenderSize } from "../../utils/utils";
export default function MoviesList({ moviesToRender, saveMovie, deleteMovie }) {
  const [moviesToShow, setMoviesToShow] = React.useState([]); // фильмы для рендера по частям
  const [renderSize, setRenderSize] = React.useState(
    calculateRenderSize(window.innerWidth)
  );
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useState(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  React.useEffect(() => {
    const renderSize = calculateRenderSize(windowWidth);
    setRenderSize(renderSize);
    setMoviesToShow(moviesToRender.slice(0, renderSize.amount));
  }, [windowWidth, moviesToRender]);

  const moviesList = moviesToShow.map((movie) => (
    <MoviesCard
      key={movie.id}
      movie={movie}
      imageUrl={`${BASE_URL_MOVIE_SERVER}${movie.image.url}`}
      nameRU={movie.nameRU}
      duration={setDuration(movie.duration)}
      saveMovie={saveMovie}
      deleteMovie={deleteMovie}
      isLiked={movie.isLiked}
    />
  ));

  function handleClick() {
    const start = moviesToShow.length;
    setMoviesToShow([
      ...moviesToShow,
      ...moviesToRender.slice(start, start + renderSize.step),
    ]);
  }

  return (
    <>
      <ul className="movies__list">{moviesList}</ul>
      <button
        type="button"
        className="movies__search button"
        onClick={handleClick}
        hidden={moviesToRender.length - moviesToShow.length > 0 ? false : true}
      >
        Еще
      </button>
    </>
  );
}
