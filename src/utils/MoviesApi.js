import {BASE_URL_MOVIE_SERVER} from '../utils/constants';
const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)

const moviesApi = (url, method, body) => {
  const headers = {
    "Content-Type": "application/json"
  }
  const config = {
    method,
    headers,
  }
  if (body !== undefined) {
    config.body = JSON.stringify(body)
  }
  return fetch(`${BASE_URL_MOVIE_SERVER}${url}`, config).then(checkResponse);
}

export const getMovies = () => {
  return moviesApi('/beatfilm-movies', 'GET')
}