import ordersTypes from "./orders.types"

export const saveOrderHistory = (order) => ({
  type: ordersTypes.SAVE_ORDER_HISTORY_START,
  payload: order,
})

export const getUserOrderHistory = () => ({
  type: ordersTypes.GET_USER_ORDER_HISTORY_START,
})

export const setUserOrderHistory = (history) => ({
  type: ordersTypes.SET_USER_ORDER_HISTORY,
  payload: history,
})

export const getOrderDetailsStart = (orderId) => ({
  type: ordersTypes.GET_ORDER_DETAILS_START,
  payload: orderId,
})

export const setOrderDetails = (order) => ({
  type: ordersTypes.SET_ORDER_DETAILS,
  payload: order,
})
