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
import {store} from "./../../redux/createStore"
import {
  approveCommentStart,
  rejectCommentStart,
} from "../../redux/Products/products.actions"

const columns = [
  {
    id: "commentId",
    label: "Comment ID",
  },
  {
    id: "productId",
    label: "Product ID",
  },
  {
    id: "commentorName",
    label: "Commentor Name",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "approve",
    label: "Approve Comment",
  },
  {
    id: "reject",
    label: "Reject Comment",
  },
]

const styles = {
  fontSize: "16px",
  cursor: "pointer",
  width: "10%",
}

const formatText = (columnName, columnValue) => {
  const {commentId} = columnValue
  switch (columnName) {
    case "approve":
      const handleApprove = (commentData) => {
        store.dispatch(approveCommentStart(commentData))
      }
      return <span onClick={() => handleApprove(commentId)}> Add </span>

    case "reject":
      const handleReject = (commentData) => {
        store.dispatch(rejectCommentStart(commentData))
      }
      return <span onClick={() => handleReject(commentId)}>Delete</span>

    case "commentId":
      return <span>{commentId}</span>

    case "commentorName":
      const {commentorName} = columnValue

      return <span>{commentorName}</span>
    case "productId":
      const {productId} = columnValue

      return <span>{productId}</span>

    case "description":
      const {description} = columnValue

      return <span>{description}</span>
    default:
      return columnValue
  }
}

const UnapprovedComments = ({comments}) => {
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
          {Array.isArray(comments) &&
            comments.length > 0 &&
            comments.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {columns.map((column, pos) => {
                    const columnName = column.id
                    const columnValue = row
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

export default UnapprovedComments
