import {
  INIT_OPEN_INGREDIENT,
  CLEAR_OPEN_INGREDIENT,
} from '../actions/current-ingredient';

const initialState = {
  data: null,
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_OPEN_INGREDIENT: {
      return {
        data: action.item,
      };
    }
    case CLEAR_OPEN_INGREDIENT: {
      return {
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};
