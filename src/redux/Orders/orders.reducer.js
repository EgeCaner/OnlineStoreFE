import ordersTypes from "./orders.types"

const INITIAL_STATE = {
  orderHistory: [],
  orderAnalytics: [],
  orderDetails: {},
}

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ordersTypes.SET_USER_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload,
      }
      case ordersTypes.SET_ALL_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload,
      }
      case ordersTypes.SET_ORDER_ANALYTICS:
        return {
          ...state,
          orderAnalytics: action.payload,
        }
      case ordersTypes.SET_ALL_ORDER_DETAILS:
      return {
        ...state,
        orderHistory: action.payload,
      }
    case ordersTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      }
    default:
      return state
  }
}

export default ordersReducer
