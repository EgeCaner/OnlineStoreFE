import {apiInstance} from "./../../Utils"
import {useCartData} from "./../../customHooks"

export const addCartItem = async (productId, amount) => {
  console.log(productId, amount)
  let response = new Promise((resolve, reject) => {
    apiInstance
      .put("/ShoppingCart/AddCartItem", {
        ProductId: productId,
        Quantity: amount,
      })
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch(() => {
        const err = ["Unable to add cart item. Please try again."]
        reject(err)
      })
  })
  let result = await response
  return result
}

export const deleteCartItem = async (productId) => {
  let json = JSON.stringify({ProductId: productId})
  console.log("barba")
  let response = new Promise((resolve, reject) => {
    apiInstance
      .delete("/ShoppingCart/DeleteCartItem", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ProductId: productId,
        },
      })
      .then((res) => {
        console.log("came this long")
        resolve(res)
      })
      .catch(() => {
        const err = ["Unable to delete cart item. Please try again."]
        reject(err)
      })
  })
  let result = await response
  return result
}

export const getCart = async () => {
  let response = new Promise((resolve, reject) => {
    apiInstance
      .get("/ShoppingCart/GetCart")
      .then((res) => {
        resolve(res)
      })
      .catch(() => {
        const err = ["Unable to get cart. Please try again."]
        reject(err)
      })
  })
  let result = await response
  console.log(result)
  return result
}

export const updateCartItem = async (productId, amount) => {
  console.log(productId, amount)
  let response = new Promise((resolve, reject) => {
    apiInstance
      .put("/ShoppingCart/UpdateCartItem", {
        Quantity: amount,
        ProductId: productId,
      })
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch(() => {
        const err = ["Couldn't update cart item. Please try again."]
        reject(err)
      })
  })
  let result = await response
  console.log(result)
  return result
}

export const addCart = async () => {
  let response = new Promise((resolve, reject) => {
    apiInstance
      .put("/ShoppingCart/Add", {
        Items: [],
      })
      .then((res) => {
        resolve(res)
      })
      .catch(() => {
        const err = ["Unable to add cart. Please try again."]
        reject(err)
      })
  })
  let result = await response
  console.log(result)
  return result
}
