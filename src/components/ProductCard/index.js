import React, {useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions"
import {addProduct} from "./../../redux/Cart/cart.actions"
import Button from "./../forms/Button"
import "./styles.scss"

const mapState = (state) => ({
  product: state.productsData.product,
})

const ProductCard = ({}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {productId} = useParams()
  const {product} = useSelector(mapState)

  const {imageUrl, productName, price, description} = product

  useEffect(() => {
    dispatch(fetchProductStart(productId))

    return () => {
      dispatch(setProduct({}))
    }
  }, [])

  const handleAddToCart = (product) => {
    if (!product) return
    dispatch(addProduct(product))
    history.push("/cart")
  }

  const configAddToCartBtn = {
    type: "button",
  }

  return (
    <div className="productCard">
      <div className="hero">
        <img src={imageUrl} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>£{price}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </li>
          <li>
            <span
              className="desc"
              dangerouslySetInnerHTML={{__html: description}}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProductCard
