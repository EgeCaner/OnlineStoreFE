import ordersTypes from "./orders.types"
import {takeLatest, put, all, call} from "redux-saga/effects"
import {
  handleSaveOrder,
  handleGetUserOrderHistory,
  handleGetOrder,
} from "./orders.helpers"
import {clearCart} from "./../Cart/cart.actions"
import {setUserOrderHistory, setOrderDetails} from "./orders.actions"
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

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ])
}
