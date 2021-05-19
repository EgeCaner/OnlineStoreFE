import cartTypes from "./cart.types"
import {
  handleAddToCart,
  handleRemoveCartItem,
  handleReduceCartItem,
  handleClearCart,
} from "./cart.sagas"
const INITIAL_STATE = {
  cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.GET_CART:
      return {
        ...state,
        cartItems: action.payload,
      }

    default:
      return state
  }
}

export default cartReducer
