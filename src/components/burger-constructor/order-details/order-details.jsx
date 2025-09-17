import DoneSvg from '../../../images/graphics.svg';

import styles from './order-details.module.css';

export const OrderDetails = () => {
  return (
    <div className={styles.content}>
      <span className="pt-10 pl-30 pr-30 text text_type_digits-large">034536</span>
      <span className="pt-8 text text_type_main-medium">Идентификатор заказа</span>
      <img className={`pt-15 ${styles.image}`} src={DoneSvg} alt="Заказ готов" />
      <span className="pt-15 text text_type_main-small">Ваш заказ начали готовить</span>
      <span className="pt-2 pb-30 ext text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};
