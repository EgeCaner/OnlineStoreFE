import React, {useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {
  fetchProductStart,
  fetchCommentsStart,
  addCommentStart,
  setProduct,
} from "./../../redux/Products/products.actions"
import {addProduct} from "./../../redux/Cart/cart.actions"
import Button from "./../forms/Button"
import StarRatingComponent from "react-star-rating-component"
import "./styles.scss"

const mapState = (state) => ({
  product: state.productsData.product,
  comments: state.productsData.comments,
})

let com = ""

const ProductCard = ({}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {productId} = useParams()
  const {product, comments} = useSelector(mapState)

  const {imageUrl, productName, price, description, rating} = product

  useEffect(() => {
    dispatch(fetchProductStart(productId))
    dispatch(fetchCommentsStart(productId))

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

  const handleAddComments = (comments) => {
    console.log(comments)
    com = comments.target.value
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
      <div>
        <div className="comments">
          <StarRatingComponent
            name="rate2"
            editing={false}
            starCount={5}
            value={rating}
            size={500}
            style={{
              margin: 0,
              marginRight: 6,
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      <form>
        <textarea
          sstyle=" min-width:5000px; max-width:100%;min-height:50px;max-height:100%;width:100%;"
          rows="4"
          cols="100"
          placeholder="Make your comment"
          type="text"
          height="150px"
          onChange={handleAddComments}
        />
      </form>
      <Button
        className="button"
        onClick={() =>
          dispatch(
            addCommentStart({
              commentorName: "bariscan",
              description: com,
              ProductId: productId,
            })
          )
        }
      >
        Submit
      </Button>

      <h3 class="commentsheader">Comments:</h3>
      <div className="comments">
        {Array.isArray(comments) &&
          comments.length > 0 &&
          comments.map((comments, pos) => {
            const {description, commentorName, like} = comments
            return (
              <tr key={pos}>
                <ul class="separator">
                  <p>{description} </p>
                  <h4>{commentorName}</h4>
                  <h4>Likes: {like}</h4>
                </ul>
              </tr>
            )
          })}
      </div>
    </div>
  )
}

export default ProductCard
