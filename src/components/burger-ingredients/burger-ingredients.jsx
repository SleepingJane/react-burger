import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { IngredientGroup } from './ingredient-group/ingredient-group';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const sauces = [];
  const toppings = [];
  const buns = [];

  ingredients.map((item) => {
    switch (item.type) {
      case 'bun':
        buns.push(item);
        break;
      case 'main':
        toppings.push(item);
        break;
      default:
        sauces.push(item);
    }
  });

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
        <div className={`${styles.groups} mt-10 custom-scroll`}>
          <IngredientGroup groupTitle="Булки" ingredients={buns} />
          <IngredientGroup groupTitle="Соусы" ingredients={sauces} />
          <IngredientGroup groupTitle="Начинки" ingredients={toppings} />
        </div>
      </nav>
    </section>
  );
};
