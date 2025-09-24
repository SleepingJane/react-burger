import {
  GET_INGREDIENTS_LIST,
  GET_INGREDIENTS_LIST_FAILED,
  GET_INGREDIENTS_LIST_SUCCESS,
} from '../actions/ingredients-list';

const initialState = {
  data: [],
  ingredientsListMethodsFailed: false,
  ingredientsListRequest: true,
};

export const ingredientsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_LIST: {
      return {
        ...state,
        ingredientsListMethodsFailed: false,
        ingredientsListRequest: true,
      };
    }
    case GET_INGREDIENTS_LIST_SUCCESS: {
      return {
        ...state,
        data: action.data,
        ingredientsListRequest: false,
        ingredientsListMethodsFailed: false,
      };
    }
    case GET_INGREDIENTS_LIST_FAILED: {
      return {
        ...state,
        ingredientsListMethodsFailed: true,
        ingredientsListRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
