import {useEffect} from "react"
import {useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import {checkUserIsAdmin} from "../Utils"

const mapState = ({cartData}) => ({
  cartItems: cartData.cartItems,
})

const useCartInfo = (props) => {
  return props
}

export default useCartInfo
