import { BASE_URL, checkResponse } from '@/utils/api';

export const GET_INGREDIENTS_LIST = 'GET_INGREDIENTS_LIST';
export const GET_INGREDIENTS_LIST_FAILED = 'GET_INGREDIENTS_LIST_FAILED';
export const GET_INGREDIENTS_LIST_SUCCESS = 'GET_INGREDIENTS_LIST_SUCCESS';

const getIngredientsListRequest = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then((response) => {
      return checkResponse(response);
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
