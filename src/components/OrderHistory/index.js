import React from "react"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core"
import moment from "moment"
import {useHistory} from "react-router-dom"
import {useSelector} from "react-redux"

const columns = [
  {
    id: "createDate",
    label: "Order Date",
  },
  {
    id: "id",
    label: "Order ID",
  },
  {
    id: "price",
    label: "Amount",
  },
]

const styles = {
  fontSize: "16px",
  cursor: "pointer",
  width: "10%",
}

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "price":
      return `£${columnValue}`
    case "createDate":
      return moment(columnValue.nano).format("DD/MM/YYYY")
    default:
      return columnValue
  }
}

const OrderHistory = ({orders}) => {
  const history = useHistory()
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, pos) => {
              const {label} = column

              return (
                <TableCell key={pos} style={styles}>
                  {label}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, pos) => {
              const {id} = row

              return (
                <TableRow
                  key={pos}
                  onClick={() => history.push(`/order/${id}`)}
                >
                  {columns.map((column, pos) => {
                    const columnName = column.id
                    const columnValue = row[columnName]
                    const formattedText = formatText(columnName, columnValue)

                    return (
                      <TableCell key={pos} style={styles}>
                        {formattedText}
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

export default OrderHistory
