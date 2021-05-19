import {firestore} from "./../../firebase/utils"
import {apiInstance} from "./../../Utils"

export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("Order/GetById")
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const handleGetUserOrderHistory = () => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("Order/GetById")
      .then((snap) => {
        console.log(snap)
        const data = [...snap.data.data]
        resolve({data})
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const handleGetOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`Order/Getall`)
      .then((snap) => {
        const OrderDetailsdata = snap.data.data.filter((order) => {
          return order.id == orderId
        })
        resolve({
          ...OrderDetailsdata,
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}
