import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const MOVE_ITEMS = 'MOVE_ITEMS';

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addIngredient = (item) => {
  return {
    type: ADD_INGREDIENT,
    item: {
      ...item,
      uniqueId: uuidv4(),
    },
  };
};
