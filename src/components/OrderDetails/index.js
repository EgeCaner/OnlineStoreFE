import React, {useEffect, useState} from "react"
import {fetchProductsStart} from "./../../redux/Products/products.actions"
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core"
import {useDispatch} from "react-redux"
import {setOrderDetails} from "./../../redux/Orders/orders.actions"
import {useSelector} from "react-redux"
import {apiInstance} from "./../../Utils"
import {handleFetchProduct} from "./../../redux/Products/products.helpers"
import {put, takeLatest, call} from "redux-saga/effects"
import ordersTypes from "./../../redux/Orders/orders.types"

const columns = [
  {
    id: "status",
    label: "Status",
  },
  {
    id: "imageUrl",
    label: "Name",
  },
  {
    id: "productId",
    label: "",
  },
  {
    id: "price",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Amount",
  },
]

const styles = {
  fontSize: "16px",
  width: "10%",
}

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "status":
      if (columnValue == "0") return `Processing...`
      else if (columnValue == "1") return "Shipped..."
      else if (columnValue == "2") return "Delivered..."
      else if (columnValue == "3") return "Refunded..."
    case "price":
      return `£${columnValue}`
    case "productId":
      if (columnValue) {
        const {imageUrl} = columnValue
        return <img src={imageUrl} width={250} />
      } else {
        return ""
      }
    case "imageUrl":
      if (columnValue) {
        const {productName} = columnValue
        return `${productName}`
      } else {
        return ""
      }
    default:
      return columnValue
  }
}

const OrderDetails = (order) => {
  const [theProduct, setTheProduct] = useState({})
  const dispatch = useDispatch()
  const orderItems = [order.order]
  console.log(orderItems)
  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}))
    }
  }, [])

  async function getProduct(orderItems) {
    return await apiInstance
      .get(`Product/GetById/${orderItems[0].productId}`)
      .then((res) => setTheProduct(res.data.data))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    if (!isNaN(orderItems[0].productId)) {
      let pro = getProduct(orderItems)
      console.log(pro)

      console.log(theProduct)
    }
  }, [orderItems[0].productId])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, pos) => {
              return (
                <TableCell key={pos} style={styles}>
                  {col.label}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {columns.map((col, pos) => {
                    const columnName = col.id
                    let columnValue = row[columnName]
                    if (columnName == "productId" || columnName == "imageUrl") {
                      columnValue = theProduct
                    }

                    return (
                      <TableCell key={pos} style={styles}>
                        {formatText(columnName, columnValue)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderDetails
