import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useModal } from '../../hooks/useModal';
import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ selectedIngredients }) => {
  const fullPrice = 610;
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <section className={`${styles.container}`}>
      <div className={`pl-10 ${styles.ingredient}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      {selectedIngredients && (
        <div className={`custom-scroll ${styles.selectedIngredients} ${styles.list}`}>
          <ul>
            {selectedIngredients.map((item) => {
              if (item.type === 'main' || item.type === 'sauce') {
                return (
                  <li
                    key={`constructor-${item._id}`}
                    className={`pr-2 ${styles.ingredient}`}
                  >
                    <DragIcon className={`pr-2 ${styles.dragIcon}`} />
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
      <div className={`pl-10 ${styles.ingredient}`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <div className={`pt-10 text text_type_main-large ${styles.createOrder}`}>
        {fullPrice}
        <CurrencyIcon className="ml-3" />
        <Button
          extraClass="ml-10"
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
