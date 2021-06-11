import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getAllOrderHistory} from "./../../redux/Orders/orders.actions"
import OrderAdminHistory from "./../../components/OrderHistory/adminhistory"
import "./styles.scss"

const mapState = ({user, ordersData,orderAnalytics}) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory,
  orderAnalytics: ordersData.orderAnalytics
})

const Orders = (props) => {
  const dispatch = useDispatch()
  const {currentUser, orderHistory, orderAnalytics} = useSelector(mapState)

  useEffect(() => {
    dispatch(getAllOrderHistory())
  }, [])
  
  return (
    <div>
      <h1>Orders Admin Layout</h1>

      <OrderAdminHistory orders={orderHistory} />
    </div>
  )
}

export default Orders

