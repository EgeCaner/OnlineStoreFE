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

export const discountProductStart = (payload) => ({
  type: productsTypes.DISCOUNT_PRODUCT_START,
  payload: payload,
})

export const setProduct = (product) => ({
  type: productsTypes.SET_PRODUCT,
  payload: product,
})

export const updateProductStart = (updateData) => ({
  type: productsTypes.UPDATE_PRODUCT_START,
  payload: updateData,
})

export const approveCommentStart = (commentId) => ({
  type: productsTypes.APPROVE_COMMENT_START,
  payload: commentId,
})

export const rejectCommentStart = (commentId) => ({
  type: productsTypes.REJECT_COMMENT_START,
  payload: commentId,
})

export const deleteCommentStart = (commentId) => ({
  type: productsTypes.DELETE_COMMENT_START,
  payload: commentId,
})

export const fetchCommentsStart = (productID) => ({
  type: productsTypes.FETCH_COMMENTS_START,
  payload: productID,
})

export const getUnapprovedComments = () => ({
  type: productsTypes.GET_UNAPPROVED_COMMENTS,
})

export const setComments = (comments) => ({
  type: productsTypes.SET_COMMENTS,
  payload: comments,
})

export const addCommentStart = (commentData) => ({
  type: productsTypes.ADD_NEW_COMMENT_START,
  payload: commentData,
})
