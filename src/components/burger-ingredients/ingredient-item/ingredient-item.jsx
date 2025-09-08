import { Modal } from '@/components/modal/modal';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

import { IngredientDetails } from '../ingredient-details/ingredient-details';

import styles from './ingredient-item.module.css';

export const IngredientItem = ({ item, count }) => {
  const [isModalActive, setIsModalActive] = React.useState(false);

  const onClick = () => {
    setIsModalActive(!isModalActive);
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.image}>
        <img src={item.image} alt={item.name} />
        {count && <Counter count={count} size="default" />}
      </div>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <span className="text text_type_main-medium">{item.price}</span>
        <CurrencyIcon className="pl-1" />
      </div>
      {item.name}
      <Modal headerTitle="Детали ингредиента" isOpen={isModalActive} onClose={onClick}>
        <IngredientDetails item={item} />
      </Modal>
    </div>
  );
};
