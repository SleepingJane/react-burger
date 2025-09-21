export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : response.json().then(() => Promise.reject(`Ошибка ${response.status}`));
};
