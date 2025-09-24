import { combineReducers } from 'redux';

import { constructorIngredientsListReducer } from './constructor-ingredients-list';
import { currentIngredientReducer } from './current-ingredient';
import { ingredientsListReducer } from './ingredients-list';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  constructorIngredientsList: constructorIngredientsListReducer,
  currentIngredient: currentIngredientReducer,
  orderInfo: orderReducer,
});
