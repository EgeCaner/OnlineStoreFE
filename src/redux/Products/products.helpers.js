//import {firestore} from "./../../firebase/utils"
import {apiInstance} from "./../../Utils"

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    /* firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      }) */
  })
}

export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    /* const pageSize = 6

    let ref = firestore
      .collection("products")
      .orderBy("createdDate")
      .limit(pageSize)

    if (filterType) ref = ref.where("categoryId", "==", filterType)
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc) */

    apiInstance
      .get("Product/getall")
      .then((snapshot) => {
        console.log(snapshot)
        const dataInput = snapshot.data.data
        let dataInput1 = dataInput.filter((product) => {
          return product.categoryId == filterType
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

export const handleDeleteProduct = (documentID) => {
  return new Promise((resolve, reject) => {
    /*  firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        console.log(documentID, 2)
        resolve()
      })
      .catch((err) => {
        reject(err)
      }) */
  })
}

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    /* firestore
      .collection("products")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentID: productID,
          })
        }
      })
      .catch((err) => {
        reject(err)
      }) */
  })
}
