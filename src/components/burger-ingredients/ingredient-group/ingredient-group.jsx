import React from 'react';
import { useSelector } from 'react-redux';

import { IngredientItem } from '../ingredient-item/ingredient-item';

import styles from './ingredient-group.module.css';

export const IngredientGroup = ({ groupTitle, ingredients, titleRef }) => {
  const constructorItems = useSelector(
    (store) => store.constructorIngredientsList.constructorItems
  );

  const ingredientsCounters = React.useMemo(() => {
    const { bunItem, ingredients } = constructorItems;
    const counters = {};

    ingredients.forEach((item) => {
      if (!counters[item._id]) {
        counters[item._id] = 0;
      }
      counters[item._id]++;
    });

    if (bunItem) {
      counters[bunItem._id] = 2;
    }

    return counters;
  }, [constructorItems]);

  return (
    <>
      <h2 className="text text_type_main-medium" ref={titleRef}>
        {groupTitle}
      </h2>
      <section>
        <ul className={`pt-6 pl-4 pr-4 pb-10 ${styles.ingredients}`}>
          {ingredients.map((item) => {
            return (
              <li key={`group-${item._id}`} className={`${styles.item}`}>
                <IngredientItem
                  item={item}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  count={ingredientsCounters[item._id]}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
