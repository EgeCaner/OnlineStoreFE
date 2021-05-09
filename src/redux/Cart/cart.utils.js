export const existingCartItem = ({prevCartItems, nextCartItem}) => {
  return prevCartItems.find(
    (cartItem) => cartItem.productId === nextCartItem.productId
  )
}

export const handleAddToCart = ({prevCartItems, nextCartItem}) => {
  const amountIncrement = 1
  const cartItemExists = existingCartItem({prevCartItems, nextCartItem})

  if (cartItemExists) {
    return prevCartItems.map((cartItem) =>
      cartItem.productId == nextCartItem.productId
        ? {
            ...cartItem,
            amount: cartItem.amount + amountIncrement,
          }
        : cartItem
    )
  }

  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      amount: amountIncrement,
    },
  ]
}

export const handleRemoveCartItem = ({prevCartItems, cartItemToRemove}) => {
  return prevCartItems.filter(
    (item) => item.productId !== cartItemToRemove.productId
  )
}

export const handleReduceCartItem = ({prevCartItems, cartItemToReduce}) => {
  const existingCartItem = prevCartItems.find(
    (cartItem) => cartItem.productId === cartItemToReduce.productId
  )

  if (existingCartItem.amount === 1) {
    return prevCartItems.filter(
      (cartItem) => cartItem.productId !== existingCartItem.productId
    )
  }

  return prevCartItems.map((cartItem) =>
    cartItem.productId === existingCartItem.productId
      ? {
          ...cartItem,
          amount: cartItem.amount - 1,
        }
      : cartItem
  )
}
