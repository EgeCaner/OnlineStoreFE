import ordersTypes from "./orders.types"
import {takeLatest, put, all, call} from "redux-saga/effects"
import {
  handleSaveOrder,
  handleGetUserOrderHistory,
  handleGetOrder,
  handleGetAllOrders,
  handleOrderStatus
} from "./orders.helpers"
import {clearCart} from "./../Cart/cart.actions"
import {setUserOrderHistory, setOrderDetails,setAllOrderHistory} from "./orders.actions"
import {useSelector} from "react-redux"

export function* getUserOrderHistory() {
  try {
    const history = yield handleGetUserOrderHistory()
    //console.log(history)
    yield put(setUserOrderHistory(history.data))
  } catch (err) {
    console.log(err)
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  )
}

export function* getAllOrderHistory({payload}) {
  try {
    //console.log('saga get all1:',payload)
    const history = yield handleGetAllOrders(payload)
    //console.log('saga get all:',history)
    yield put(setAllOrderHistory(history))
  } catch (err) {
    console.log(err)
  }
}

export function* onGetAllOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_ALL_ORDER_HISTORY_START,
    getAllOrderHistory
  )
}

export function* saveOrder({payload}) {
  try {
    const timestamps = new Date()
    /* yield handleSaveOrder({
      ...payload,
      orderCreatedDate: timestamps,
    }) */
    yield put(clearCart())
  } catch (err) {
    console.log(err)
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder)
}

export function* getOrderDetails({payload}) {
  try {
    console.log(payload)
    const order = yield handleGetOrder(payload)

    yield put(setOrderDetails(order[0]))
  } catch (err) {
    console.log(err)
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails)
}

export function* SetOrderStatus({payload}) {
  try {
    console.log("sass",payload)

    yield put(handleOrderStatus(payload))
  } catch (err) {
    console.log(err)
  }
}

export function* onSetOrderStatusStart() {
  yield takeLatest(ordersTypes.SET_ORDER_STATUS, SetOrderStatus)
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onSetOrderStatusStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onGetAllOrderHistoryStart),
  ])
}
