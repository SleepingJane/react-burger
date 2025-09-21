export const GET_INGREDIENTS_LIST = 'GET_INGREDIENTS_LIST';
export const GET_INGREDIENTS_LIST_FAILED = 'GET_INGREDIENTS_LIST_FAILED';
export const GET_INGREDIENTS_LIST_SUCCESS = 'GET_INGREDIENTS_LIST_SUCCESS';

const FETCH_URL = 'https://norma.nomoreparties.space/api/ingredients';

const getIngredientsListRequest = () => {
  return fetch(FETCH_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then((result) => result.data)
    .catch((error) => error);
};

export function getIngredientsList() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_LIST,
    });
    getIngredientsListRequest()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_LIST_SUCCESS,
          data: res,
        });
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        dispatch({
          type: GET_INGREDIENTS_LIST_FAILED,
        });
      });
  };
}
