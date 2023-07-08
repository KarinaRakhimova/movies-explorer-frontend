import {
  SHORT_MOVIE_DURATION,
  SCREEN_MOBILE,
  SCREEN_TABLET,
} from "./constants";

export function setDuration(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return `${hours}ч${minutes}м`;
}

export function checkSavedMovies(moviesList, savedMoviesList) {
  const cashedMoviesNames = [];
  moviesList.forEach((item) => cashedMoviesNames.push(item.nameRU));
  const savedMoviesNames = [];
  savedMoviesList.forEach((item) => savedMoviesNames.push(item.nameRU));
  const likedMoviesNames = cashedMoviesNames.filter((item) =>
    savedMoviesNames.includes(item)
  );
  moviesList.forEach((item) => {
    if (likedMoviesNames.includes(item.nameRU)) {
      item.isLiked = true;
    } else {
      item.isLiked = false;
    }
  });
}

export function searchByUserRequest(someRequest, array) {
  return array.filter((item) =>
    Object.values(item)
      .toString()
      .toLowerCase()
      .includes(someRequest.toString().toLowerCase())
  );
}

export function filterByDuration(array) {
  return array.filter((item) => item.duration <= SHORT_MOVIE_DURATION);
}

export function handleFilter(isChecked, array) {
  return isChecked ? filterByDuration(array) : array;
}

export function calculateRenderSize(width) {
  let amount, step;
  if (width <= SCREEN_MOBILE) {
    amount = 5;
    step = 2;
  } else if (width > SCREEN_MOBILE && width <= SCREEN_TABLET) {
    amount = 8;
    step = 2;
  } else {
    amount = 16;
    step = 4;
  }
  return { amount, step };
}
