import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './app.module.css';

const FETCH_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
  const [ingredients, setIngredients] = React.useState();

  React.useEffect(() => {
    fetch(FETCH_URL)
      .then((response) => response.json())
      .then((result) => setIngredients(result.data))
      .catch((error) => console.error('Ошибка:', error));
  }, []);

  if (!ingredients) {
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
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor selectedIngredients={ingredients} />
        </main>
        <div id="modal"></div>
      </div>
    )
  );
};
