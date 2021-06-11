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

export const handleOrderStatus = (payload) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .put(`Order/ChangeStatus`,{Id: payload.id, Status: payload.e, Quantity: payload.quant,ProductId: payload.productId })
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


export const handleGetOrderAnalytics = (payload  ) => {
  return new Promise((resolve, reject) => {
    var now = (payload.selection.endDate).toISOString()
    
    
    
    var lastWeek = (payload.selection.startDate).toISOString();
   
    console.log ("dalga",lastWeek)
    apiInstance
      .get(`Order/GetSaleStatistic/${lastWeek}/${now}`)
      .then((snap) => {
        console.log("heyy",snap)
        let AnalyticsData = snap.data.data
        
        const data = [...AnalyticsData]

        resolve({
          ...AnalyticsData,
        })
        return AnalyticsData
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const handleGetAllOrders = (  ) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`Order/Getall`)
      .then((snap) => {
        console.log("heyy",snap)
        let OrderDetailsdata = snap.data.data.filter((order) => {
          return order
        })
        const data = [...OrderDetailsdata]

        resolve({
         data,
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}
