import { createOrder } from '@/services/actions/order';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DoneSvg from '../../../images/graphics.svg';

import styles from './order-details.module.css';

export const OrderDetails = () => {
  const dispatch = useDispatch();

  const { bunItem, selectedIngredients, orderId, isLoading } = useSelector((store) => ({
    bunItem: store.constructorIngredientsList.constructorItems.bunItem,
    selectedIngredients: store.constructorIngredientsList.constructorItems.ingredients,
    orderId: store.orderInfo.orderId,
    isLoading: store.orderInfo.orderRequest,
  }));

  React.useEffect(() => {
    dispatch(createOrder([bunItem, ...selectedIngredients, bunItem]));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.preloader}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <span className="pt-10 pl-30 pr-30 text text_type_digits-large">{orderId}</span>
      <span className="pt-8 text text_type_main-medium">Идентификатор заказа</span>
      <img className={`pt-15 ${styles.image}`} src={DoneSvg} alt="Заказ готов" />
      <span className="pt-15 text text_type_main-small">Ваш заказ начали готовить</span>
      <span className="pt-2 pb-30 ext text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};
