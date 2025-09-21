import { REMOVE_INGREDIENT } from '@/services/actions/constructor-ingredients-list';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

export const DraggableIngredient = ({
  item,
  id,
  index,
  iconClassName,
  moveIngredient,
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, drag] = useDrag({
    type: 'constructor-ingredient',
    item: () => {
      return { id, index };
    },
  });

  const [{ handlerId }, drop] = useDrop({
    item: () => ({ item }),
    accept: 'constructor-ingredient',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} data-handler-id={handlerId}>
      <DragIcon className={iconClassName} />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch({ type: REMOVE_INGREDIENT, item, index });
        }}
      />
    </div>
  );
};
