export const BASE_URL = 'https://api.krr-diploma.nomoredomains.rocks/';
const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
export const mainApi = (url, method, body) => {
  const headers = {
    "Content-Type": "application/json"
  }
  const config = {
    method,
    headers,
    credentials: 'include'
  }
  if (body !== undefined) {
    config.body = JSON.stringify(body)
  }
  return fetch(`${BASE_URL}${url}`, config).then(checkResponse)
}
export const register = (userInfo) => {
  return mainApi('signup', 'POST', userInfo)
}

export const login = (userInfo) => {
  return mainApi('signin', 'POST', userInfo)
}

export const signout = () => {
  return mainApi('signout', 'POST', undefined)
 }
export const updateUser = (userInfo) => {
  return mainApi('users/me', 'PATCH', userInfo)
}

export const getToken = () => {
  return mainApi('users/me', 'GET', undefined)
}

export const getUserInfo = () => {
  return mainApi('users/me', 'GET')
}

export const saveMovie = (movieInfo) => {
  return mainApi('movies', 'POST', movieInfo)
}

export const getSavedMovies = () => {
  return mainApi('movies', 'GET')
}

export const deleteMovie = (movieInfo) => {
  return mainApi(`movies/${movieInfo}`, 'DELETE')
}