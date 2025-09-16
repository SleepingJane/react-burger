import { IngredientItem } from '../ingredient-item/ingredient-item';

import styles from './ingredient-group.module.css';

export const IngredientGroup = ({ groupTitle, ingredients }) => {
  return (
    <>
      <h2 className="text text_type_main-medium">{groupTitle}</h2>
      <section>
        <ul className={`pt-6 pl-4 pr-4 pb-10 ${styles.ingredients}`}>
          {ingredients.map((item) => {
            return (
              <li key={`group-${item._id}`} className={`${styles.item}`}>
                <IngredientItem
                  item={item}
                  image={item.image}
                  name={item.name}
                  count={1}
                  price={item.price}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
