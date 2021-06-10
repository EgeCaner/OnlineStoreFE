import productsTypes from "./products.types"

export const addProductStart = (productData) => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
})

export const fetchProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters,
})

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
})

export const deleteProductStart = (productID) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: productID,
})

export const fetchProductStart = (productID) => ({
  type: productsTypes.FETCH_PRODUCT_START,
  payload: productID,
})

export const setProduct = (product) => ({
  type: productsTypes.SET_PRODUCT,
  payload: product,
})
export const updateProductStart = (updateData) => ({
  type: productsTypes.UPDATE_PRODUCT_START,
  payload: updateData,
})

export const addCommentStart = (comment) => ({
  type: productsTypes.ADD_NEW_COMMENT_START,
  payload: comment,
})

export const deleteCommentStart = (productID) => ({
  type: productsTypes.DELETE_COMMENT_START,
  payload: productID,
})

export const fetchCommentsStart = (productID) => ({
  type: productsTypes.FETCH_COMMENTS_START,
  payload: productID,
})

export const setComments = (comments) => ({
  type: productsTypes.SET_COMMENTS,
  payload: comments,
})
