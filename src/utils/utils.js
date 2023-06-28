export function setDuration(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return `${hours}ч${minutes}м`;
}

export function filterByDuration(item) {
  return item.duration <= 40;
}

export function filterByUserRequest(someRequest, item) {
  return Object.values(item)
    .toString()
    .toLowerCase()
    .includes(Object.values(someRequest).toString().toLowerCase());
}

export function checkSavedMoviesInLocalStorage(cashedMovies, savedMovies) {
  const cashedMoviesNames = [];
  cashedMovies.forEach(item => cashedMoviesNames.push(item.nameRU));
  const savedMoviesNames = [];
  savedMovies.forEach(item => savedMoviesNames.push(item.nameRU))
  const likedMoviesNames = cashedMoviesNames.filter(item => savedMoviesNames.includes(item))
  cashedMovies.forEach(item => {
    if (likedMoviesNames.includes(item.nameRU)) {
      item.isLiked = true;
    }
  })
}