import productsTypes from "./products.types"

const INITIAL_STATE = {
  products: [],
  loading: false,
  comments: [],
  product: {},
}

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case productsTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      }
    case productsTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      }

    default:
      return state
  }
}

export default productsReducer
