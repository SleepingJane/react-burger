import { ADD_INGREDIENT } from '@/services/actions/constructor-ingredients-list';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { useModal } from '../../hooks/useModal';
import { Modal } from '../modal/modal';
import { DraggableIngredient } from './draggable-ingredient/draggable-ingredient';
import { OrderDetails } from './order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const { ingredients, constructorItems } = useSelector((store) => ({
    constructorItems: store.constructorIngredientsList.constructorItems,
    ingredients: store.ingredientsList.data,
  }));

  const fullPrice = React.useMemo(() => {
    let total = constructorItems.bunItem ? constructorItems.bunItem.price * 2 : 0;
    return constructorItems.ingredients.reduce((sum, item) => sum + item.price, total);
  }, [constructorItems.bunItem, constructorItems.ingredients]);

  React.useEffect(() => {
    dispatch({
      type: ADD_INGREDIENT,
      item: ingredients.find((item) => item.type === 'bun'),
    });
  }, [dispatch]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop({ item }) {
      addIngredient(item);
    },
  });

  const [{ isHoverConstructor }, dropTargetConstructor] = useDrop({
    accept: 'constructor-ingredient',
    collect: (monitor) => ({
      isHoverConstructor: monitor.isOver(),
    }),
  });

  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch({ type: 'MOVE_ITEMS', toIndex: dragIndex, fromIndex: hoverIndex });
  }, []);

  const addIngredient = (item) => {
    dispatch({ type: ADD_INGREDIENT, item });
  };

  return (
    <section ref={dropTarget} className={`${styles.container}`}>
      <div className={`pl-10 ${styles.ingredient}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={
            constructorItems.bunItem ? `${constructorItems.bunItem.name} (верх)` : ''
          }
          price={constructorItems.bunItem ? constructorItems.bunItem.price : undefined}
          thumbnail={
            constructorItems.bunItem ? constructorItems.bunItem.image : undefined
          }
        />
      </div>
      {!constructorItems.ingredients ||
        (!constructorItems.ingredients.length && (
          <div
            className={`${styles.emptyView} ${isHover ? styles.activeZone : ''} ${styles.emptyViewBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Выберите начинку
          </div>
        ))}
      {!!constructorItems.ingredients.length && (
        <div
          ref={dropTargetConstructor}
          className={`custom-scroll ${styles.selectedIngredients} ${styles.list} ${isHover || isHoverConstructor ? styles.activeZone : ''}`}
        >
          <ul>
            {constructorItems.ingredients.map((item, index) => {
              if (item.type === 'main' || item.type === 'sauce') {
                return (
                  <li
                    key={`constructor-${item._id}-${index}`}
                    className={`pr-2 ${styles.ingredient}`}
                  >
                    <DraggableIngredient
                      item={item}
                      moveIngredient={moveIngredient}
                      index={index}
                      id={item._id}
                      iconClassName={`pr-2 ${styles.dragIcon}`}
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
          text={constructorItems.bunItem ? `${constructorItems.bunItem.name} (низ)` : ''}
          price={constructorItems.bunItem ? constructorItems.bunItem.price : undefined}
          thumbnail={
            constructorItems.bunItem ? constructorItems.bunItem.image : undefined
          }
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
