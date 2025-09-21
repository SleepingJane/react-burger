export const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : response.json().then(() => Promise.reject(`Ошибка ${response.status}`));
};

export const request = (url, options) => {
  return fetch(`${BASE_URL}${url}`, options).then(checkResponse);
};
