import {
  addCartItem,
  deleteCartItem,
  updateCartItem,
  getCart,
  addCart,
} from "./cart.helpers"
import {store} from "./../createStore"

import {getCartA} from "./cart.actions"
import cartTypes from "./cart.types"
import {takeLatest, call, all, put} from "redux-saga/effects"

export const existingCartItem = ({prevCartItems, nextCartItem}) => {
  return prevCartItems.find((cartItem) => cartItem.productId === nextCartItem)
}

export function* handleAddToCart({payload}) {
  let state = store.getState()
  let prevCartItems = state.cartData.cartItems
  const amountIncrement = 1
  const {productId} = payload
  let nextCartItem = productId
  const cartItemExists = existingCartItem({prevCartItems, nextCartItem})
  console.log(cartItemExists)
  if (cartItemExists) {
    const response = yield updateCartItem(
      productId,
      cartItemExists.quantity + amountIncrement
    )

    let currentCart = yield getCart().then((res) => {
      return res.data.data.items
    })
    console.log(currentCart)
    yield put(getCartA(currentCart))
    return
  }

  addCartItem(productId, amountIncrement)
  let currentCartB = yield getCart().then((res) => {
    return res.data.data.items
  })
  yield put(getCartA(currentCartB))
}

export function* onAddToCart() {
  yield takeLatest(cartTypes.ADD_TO_CART, handleAddToCart)
}

export function* handleRemoveCartItem({payload}) {
  try {
    let state = store.getState()
    let prevCartItems = state.cartData.cartItems
    const {productId} = payload
    const nextCartItem = productId
    const cartItemExists = existingCartItem({prevCartItems, nextCartItem})
    console.log(cartItemExists)
    if (cartItemExists) {
      const response = yield deleteCartItem(nextCartItem)
      console.log(response)
    }

    let currentCart = yield getCart().then((res) => {
      return res.data.data.items
    })
    console.log(currentCart)
    yield put(getCartA(currentCart))
  } catch (err) {
    console.log(err)
  }
}

export function* onRemoveCartItem() {
  yield takeLatest(cartTypes.REMOVE_CART_ITEM, handleRemoveCartItem)
}

export function* handleReduceCartItem({payload}) {
  let state = store.getState()
  let prevCartItems = state.cartData.cartItems
  let nextCartItem = payload.productId
  let amountDecrement = 1
  const cartItemExists = existingCartItem({prevCartItems, nextCartItem})
  console.log(cartItemExists)
  if (cartItemExists.quantity === 1) {
    const response = deleteCartItem(nextCartItem)
    console.log(response)
    let currentCartA = yield getCart().then((res) => {
      return res.data.data.items
    })
    console.log(currentCartA)
    yield put(getCartA(currentCartA))
    return
  }

  const response = updateCartItem(
    nextCartItem,
    cartItemExists.quantity - amountDecrement
  )
  console.log(response)
  let currentCartB = yield getCart().then((res) => {
    return res.data.data.items
  })
  console.log(currentCartB)
  yield put(getCartA(currentCartB))
}

export function* onReduceCartItem() {
  yield takeLatest(cartTypes.REDUCE_CART_ITEM, handleReduceCartItem)
}

export function* handleClearCart() {
  let state = store.getState()
  let prevCartItems = state.cartData.cartItems
  console.log(prevCartItems)
  const arrayLength = prevCartItems.length
  for (var i = 0; i < arrayLength; i++) {
    const id = prevCartItems[i].productId
    deleteCartItem(id)
  }
  let currentCart = yield getCart().then((res) => {
    return res.data.data.items
  })
  console.log(currentCart)
  yield put(getCartA(currentCart))
}

export function* onClearCart() {
  yield takeLatest(cartTypes.CLEAR_CART, handleClearCart)
}

export function* handleGetCartB() {
  let currentCart = yield getCart().then((res) => {
    return res.data.data.items
  })
  console.log(currentCart)
  yield put(getCartA(currentCart))
}

export function* onGetCartB() {
  yield takeLatest(cartTypes.GET_CARTB, handleGetCartB)
}

export default function* cartSagas() {
  yield all([
    call(onReduceCartItem),
    call(onRemoveCartItem),
    call(onAddToCart),
    call(onClearCart),
    call(onGetCartB),
  ])
}
