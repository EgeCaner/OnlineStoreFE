//import {firestore} from "./../../firebase/utils"
import {apiInstance} from "./../../Utils"

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .put("Product/Add", {...product})
      .then((res) => {
        console.log(res)
        resolve(product)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("Product/getall")
      .then((snapshot) => {
        //console.log(snapshot)
        const dataInput = snapshot.data.data
        let dataInput1 = dataInput.filter((product) => {
          if (filterType in ["1", "2", "3", "4", "5", "6", "7", "8"]) {
            return product.categoryId == filterType
          } else {
            //console.log('helper func: ',product)
            return product
          }
        })

        const data = [...persistProducts, ...dataInput1]
        resolve({
          data,
          /*           queryDoc: snapshot.docs[totalCount - 1],
            isLastPage: totalCount < 1, */
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const handleDeleteProduct = (productId) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .delete(`Product/${productId}`)
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const handleUpdateProduct = (payload) => {
  console.log(payload)
  return new Promise((resolve, reject) => {
    apiInstance
      .put(`Product/Update`, {
        ProductId: payload.productId,
        Quantity: payload.quantity,
        ProductName: payload.productName,
        Price: payload.price,
        Description: payload.description,
        CategoryId: payload.categoryId,
        DiscountRate: payload.discountRate,
      })
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("Product/getall")
      .then((snapshot) => {
        const dataInput = snapshot.data.data
        let dataInput1 = dataInput.filter((product) => {
          return product.productId == productID
        })

        const data = {...dataInput1}
        resolve({
          data,
          /*           queryDoc: snapshot.docs[totalCount - 1],
            isLastPage: totalCount < 1, */
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const fetchCommentsHelper = (productID) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`Product/GetAllComments/${productID}`)
      .then((snapshot) => {
        console.log(snapshot)
        const dataInput = snapshot.data.data
        console.log(dataInput)
        resolve(dataInput)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const addCommentsHelper = (payload) => {
  console.log(payload)
  return new Promise((resolve, reject) => {
    apiInstance
      .put(`Product/AddComment`, payload)
      .then((res) => {
        /*const dataInput = snapshot.data.data
        console.log(dataInput)*/
        console.log(res)

        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
