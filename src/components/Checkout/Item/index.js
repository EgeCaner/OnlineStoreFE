import React from "react"
import {useDispatch} from "react-redux"
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "./../../../redux/Cart/cart.actions"

const Item = (product) => {
  const dispatch = useDispatch()
  const {productName, imageUrl, discountedPrice, quantity, productId} = product

  const handleRemoveCartItem = (productId) => {
    console.log(productId)
    dispatch(
      removeCartItem({
        productId,
      })
    )
  }

  const handleAddProduct = (product) => {
    dispatch(addProduct(product))
  }

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product))
  }

  return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <img src={imageUrl} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <span className="cartBtn" onClick={() => handleReduceItem(product)}>
              {`< `}
            </span>
            <span>{quantity}</span>
            <span className="cartBtn" onClick={() => handleAddProduct(product)}>
              {` >`}
            </span>
          </td>
          <td>£{discountedPrice}</td>
          <td align="center">
            <span
              className="cartBtn remove"
              onClick={() => handleRemoveCartItem(productId)}
            >
              X
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Item
