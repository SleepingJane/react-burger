import { Modal } from '@/components/modal/modal';
import {
  INIT_OPEN_INGREDIENT,
  CLEAR_OPEN_INGREDIENT,
} from '@/services/actions/current-ingredient';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { useModal } from '../../../hooks/useModal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

import styles from './ingredient-item.module.css';

export const IngredientItem = ({ item, count }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  const onIngredientClick = () => {
    if (!isModalOpen) {
      dispatch({ type: INIT_OPEN_INGREDIENT, item });
      openModal();
    }
  };

  const onCloseDetails = () => {
    dispatch({ type: CLEAR_OPEN_INGREDIENT });
    closeModal();
  };

  const [, ref] = useDrag({
    item: () => ({ item }),
    type: 'ingredient',
  });

  return (
    <div className={styles.container} ref={ref} onClick={onIngredientClick}>
      <div className={styles.image}>
        <img src={item.image} alt={item.name} />
        {!!count && <Counter count={count} size="default" />}
      </div>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <span className="text text_type_main-medium">{item.price}</span>
        <CurrencyIcon className="pl-1" />
      </div>
      {item.name}
      {isModalOpen && (
        <Modal onClose={onCloseDetails} headerTitle="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};
