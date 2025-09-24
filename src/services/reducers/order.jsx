import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from '../actions/order';

const initialState = {
  data: null,
  orderMethodsFailed: false,
  orderRequest: true,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderMethodsFailed: false,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderId: action.data.order.number,
        orderRequest: false,
        orderMethodsFailed: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderMethodsFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
