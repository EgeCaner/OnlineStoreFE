import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getUnapprovedComments} from "./../../redux/Products/products.actions"
import UnapprovedComments from "./../../components/ProductCard/UnapprovedComments"
import "./styles.scss"

const mapState = ({user, productsData}) => ({
  currentUser: user.currentUser,
  comments: productsData.comments,
})

const CommentsManager = (props) => {
  const dispatch = useDispatch()
  const {currentUser, comments} = useSelector(mapState)

  useEffect(() => {
    dispatch(getUnapprovedComments())
  }, [])
  console.log(comments)
  return (
    <div>
      <h1>Unapproved Comments</h1>
      <UnapprovedComments comments={comments} />
    </div>
  )
}

export default CommentsManager
