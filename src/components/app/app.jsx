import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { getIngredientsList } from '../../services/actions/ingredients-list';

import styles from './app.module.css';

export const App = () => {
  const { ingredients, isLoading } = useSelector((store) => ({
    isLoading: store.ingredientsList.ingredientsListRequest,
    ingredients: store.ingredientsList.data,
  }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredientsList());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.preloader}>
        <Preloader />
      </div>
    );
  }

  return (
    ingredients && (
      <div className={styles.app}>
        <AppHeader />
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <main className={`${styles.main} pl-5 pr-5`}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>
    )
  );
};
