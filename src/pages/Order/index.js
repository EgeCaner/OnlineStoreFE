import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import {getOrderDetailsStart} from "./../../redux/Orders/orders.actions"
import {useDispatch, useSelector} from "react-redux"
import OrderDetails from "./../../components/OrderDetails/index"

const mapState = ({ordersData}) => ({
  orderDetails: ordersData.orderDetails,
})

const Order = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderDetailsStart(id))
  }, [])
  const {orderDetails} = useSelector(mapState)
  while (orderDetails == undefined) {}
  const {price} = orderDetails

  return (
    <div>
      <h1>Order ID: #{id}</h1>

      <OrderDetails order={orderDetails} />

      <h3>Total: {price}</h3>
    </div>
  )
}

export default Order
