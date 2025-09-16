import { Modal } from '@/components/modal/modal';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useModal } from '../../../hooks/useModal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

import styles from './ingredient-item.module.css';

export const IngredientItem = ({ item, count }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const onIngredientClick = () => {
    if (!isModalOpen) {
      openModal();
    }
  };

  return (
    <div className={styles.container} onClick={onIngredientClick}>
      <div className={styles.image}>
        <img src={item.image} alt={item.name} />
        {count && <Counter count={count} size="default" />}
      </div>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <span className="text text_type_main-medium">{item.price}</span>
        <CurrencyIcon className="pl-1" />
      </div>
      {item.name}
      {isModalOpen && (
        <Modal onClose={closeModal} headerTitle="Детали ингредиента">
          <IngredientDetails item={item} />
        </Modal>
      )}
    </div>
  );
};
