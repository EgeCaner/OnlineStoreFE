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
import Button from "./../../components/forms/Button"
import {setOrderDetails,SetOrderStatus} from "./../../redux/Orders/orders.actions"
import {useSelector} from "react-redux"
import {apiInstance} from "./../../Utils"
import {handleFetchProduct} from "./../../redux/Products/products.helpers"
import {put, takeLatest, call} from "redux-saga/effects"
import ordersTypes from "./../../redux/Orders/orders.types"
//const [description, setDescription] = useState("")
const OrderDetails = (order) => {
const dispatch = useDispatch()


  
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


const handleChange = (e, id, quant) => {
  dispatch(
    SetOrderStatus({
      e,
      id,
      quant
    })
  )
  //this.props.handlePeriodChange(e);
  console.log('hety22',id)
  console.log(e)

 
}

const formatText = (columnName, columnValue, orderId, orderQuantity) => {
  switch (columnName) {
    case "status":
      if (columnValue == "0") return (<select name='option'   onChange={(val) => handleChange(val.target.value, orderId, orderQuantity)} >
      <option value="0">Processing</option>
      <option value="1">Shipped</option>
      <option value="2">Delivered</option>
      <option value="5">Refunded</option>
  </select>)
      else if (columnValue == "1") return (<select name='option' onChange={(val) => handleChange(val.target.value, orderId, orderQuantity)}>
      <option value="1">Shipped</option>
      <option value="0">Processing</option>
      <option value="2">Delivered</option>
      <option value="5">Refunded</option>
  </select>)
      else if (columnValue == "2") return (<select name='option'  onChange={(val) => handleChange(val.target.value, orderId, orderQuantity)}>
      <option value="2">Delivered</option>
      <option value="1">Shipped</option>
      <option value="0">Processing</option>
      <option value="5">Refunded</option>
  </select>)
      else if (columnValue == "5")  return (<select name='option'  onChange={(val) => handleChange(val.target.value, orderId, orderQuantity)} >
      <option value="5">Refunded</option>
      <option value="1">Shipped</option>
      <option value="0">Processing</option>
      <option value="2">Delivered</option>
  </select>)
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


  const [theProduct, setTheProduct] = useState({})
  //const dispatch = useDispatch()
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
      //console.log('ABI',pro)

      //console.log('ABI2',theProduct)
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
                    //console.log('col neymis ya',col)
                    //console.log('row neymis ya',row)
                    const columnName = col.id
                    //console.log('col name',columnName)
                    let columnValue = row[columnName]
                    let orderId = row.id
                    let orderQuantity = row.quantity
                    let productId = row.productId
                    //console.log('col val',columnValue)
                    console.log('col val',row)

                    if (columnName == "productId" || columnName == "imageUrl") {
                      columnValue = theProduct
                    }

                    return (
                      <TableCell key={pos} style={styles}>
                        {formatText(columnName, columnValue, orderId, orderQuantity)}
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
