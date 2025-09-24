import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  MOVE_ITEMS,
  REMOVE_INGREDIENT,
} from '../actions/constructor-ingredients-list';

const initialState = {
  constructorItems: {
    bunItem: null,
    ingredients: [],
  },
};

export const constructorIngredientsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_ITEMS: {
      const ingredients = [...state.constructorItems.ingredients];
      ingredients.splice(action.toIndex, 0, ingredients.splice(action.fromIndex, 1)[0]);
      return {
        constructorItems: {
          bunItem: state.constructorItems.bunItem,
          ingredients,
        },
      };
    }
    case REMOVE_INGREDIENT: {
      const ingredients = [...state.constructorItems.ingredients];
      ingredients.splice(action.index, 1);
      return {
        constructorItems: {
          bunItem: state.constructorItems.bunItem,
          ingredients,
        },
      };
    }
    case ADD_INGREDIENT: {
      if (action.item.type === 'bun') {
        return {
          constructorItems: {
            bunItem: action.item,
            ingredients: [...state.constructorItems.ingredients],
          },
        };
      }
      return {
        constructorItems: {
          bunItem: state.constructorItems.bunItem,
          ingredients: [...state.constructorItems.ingredients, action.item],
        },
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
