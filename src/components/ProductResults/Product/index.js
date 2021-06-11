import React from "react"
import {Link, useHistory} from "react-router-dom"
import Button from "./../../forms/Button"
import {useDispatch} from "react-redux"
import {addProduct} from "./../../../redux/Cart/cart.actions"

const Product = (Product) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {productId, imageUrl, productName, price} = Product
  if (!productId || !imageUrl || !productName || price === "undefined")
    return null

  const configAddToCartBtn = {
    type: "button",
  }

  const handleAddToCart = (Product) => {
    if (!Product) return
    dispatch(addProduct(Product))
    history.push("/cart")
  }

  return (
    <div className="product" id="productdiv">
      <div className="thumb">
        <Link to={`/product/${productId}`}>
          <img id="imgproduct" src={imageUrl} alt={productName} />
        </Link>
      </div>

      <div className="details">
        <ul>
          <li>
            <span className="name">
              <Link to={`/product/${productId}`}>{productName}</Link>
            </span>
          </li>
          <li>
            <span className="price">£{price}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(Product)}
              >
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Product
