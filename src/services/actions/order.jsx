export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

const FETCH_URL = 'https://norma.nomoreparties.space/api/orders';

const createOrderRequest = (selectedIngredients) => {
  const ids = selectedIngredients.map((item) => item._id);
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ids }),
  };

  return fetch(FETCH_URL, params)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch((error) => error);
};

export function createOrder(selectedIngredients) {
  return async function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });

    const result = await createOrderRequest(selectedIngredients);

    if (!result || !result.success) {
      dispatch({ type: GET_ORDER_FAILED });
      return result;
    }
    dispatch({
      type: GET_ORDER_SUCCESS,
      data: result,
    });
  };
}
