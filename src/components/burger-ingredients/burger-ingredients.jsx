import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { IngredientGroup } from './ingredient-group/ingredient-group';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState('bun');
  const sauces = [];
  const toppings = [];
  const buns = [];
  const tabsRef = useRef();
  const titleBunsRef = useRef();
  const titleSaucesRef = useRef();
  const titleToppingsRef = useRef();

  const ingredients = useSelector((store) => store.ingredientsList.data);

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

  const getLength = (rectTabs, rectTitle) => {
    return Math.abs(rectTabs.bottom - rectTitle.top);
  };

  const onScroll = () => {
    const tabsCoords = tabsRef.current.getBoundingClientRect();
    const toTitleBuns = getLength(
      tabsCoords,
      titleBunsRef.current.getBoundingClientRect()
    );
    const toTitleSauces = getLength(
      tabsCoords,
      titleSaucesRef.current.getBoundingClientRect()
    );
    const toTitleToppings = getLength(
      tabsCoords,
      titleToppingsRef.current.getBoundingClientRect()
    );

    switch (Math.min(toTitleBuns, toTitleSauces, toTitleToppings)) {
      case toTitleToppings: {
        setActiveTab('main');
        return;
      }
      case toTitleSauces: {
        setActiveTab('sauce');
        return;
      }
      default: {
        setActiveTab('bun');
        return;
      }
    }
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu} ref={tabsRef}>
          <Tab value="bun" active={activeTab === 'bun'}>
            Булки
          </Tab>
          <Tab value="sauce" active={activeTab === 'sauce'}>
            Соусы
          </Tab>
          <Tab value="main" active={activeTab === 'main'}>
            Начинки
          </Tab>
        </ul>
        <div className={`${styles.groups} mt-10 custom-scroll`} onScroll={onScroll}>
          <IngredientGroup
            titleRef={titleBunsRef}
            groupTitle="Булки"
            ingredients={buns}
          />
          <IngredientGroup
            titleRef={titleSaucesRef}
            groupTitle="Соусы"
            ingredients={sauces}
          />
          <IngredientGroup
            titleRef={titleToppingsRef}
            groupTitle="Начинки"
            ingredients={toppings}
          />
        </div>
      </nav>
    </section>
  );
};
