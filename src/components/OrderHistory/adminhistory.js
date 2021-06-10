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
    id: "Status",
    label: "Order Status",
  },
]

const styles = {
  fontSize: "16px",
  cursor: "pointer",
  width: "10%",
}

const formatText = (columnName, columnValue, status) => {
  switch (columnName) {
    case "Status":
      return `Status: ${status}`
    case "createDate":
      return moment(columnValue.nano).format("DD/MM/YYYY")
    default:
      return columnValue
  }
}

const OrderAdminHistory = ({orders}) => {
  const history = useHistory()
  console.log("sa", orders.length)

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
          {Array.isArray(orders.data) &&
            orders.data.length > 0 &&
            orders.data.map((row, pos) => {
              const {id, status} = row
              return (
                <TableRow
                  key={pos}
                  onClick={() => history.push(`/orderadmin/${id}`)}
                >
                  {columns.map((column, pos) => {
                    const columnName = column.id
                    const columnValue = row[columnName]
                    const status2 = row.status
                    const formattedText = formatText(
                      columnName,
                      columnValue,
                      status2
                    )

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

export default OrderAdminHistory
