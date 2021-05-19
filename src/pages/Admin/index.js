import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../redux/Products/products.actions"
import Modal from "./../../components/Modal"
import FormInput from "./../../components/forms/FormInput"
import FormSelect from "./../../components/forms/FormSelect"
import Button from "./../../components/forms/Button"
import LoadMore from "./../../components/LoadMore"
import CKEditor from "ckeditor4-react"
import "./styles.scss"

const mapState = ({productsData}) => ({
  products: productsData.products,
})

const Admin = (props) => {
  const {products} = useSelector(mapState)
  const dispatch = useDispatch()
  const [hideModal, setHideModal] = useState(true)
  const [categoryId, setCategoryId] = useState("0")
  const [productName, setProductName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [price, setPrice] = useState("0")
  const [description, setDescription] = useState("")

  const {data, queryDoc, isLastPage} = products

  useEffect(() => {
    dispatch(fetchProductsStart())
  }, [])

  const toggleModal = () => setHideModal(!hideModal)

  const configModal = {
    hideModal,
    toggleModal,
  }

  const resetForm = () => {
    setHideModal(true)
    setCategoryId("0")
    setProductName("")
    setImageUrl("")
    setPrice("0")
    setDescription("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      addProductStart({
        categoryId,
        productName,
        imageUrl,
        price,
        description,
      })
    )
    resetForm()
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    )
  }

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  }

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

            <FormSelect
              label="Category"
              options={[
                {
                  value: "0",
                  name: "Laptops",
                },
                {
                  value: "1",
                  name: "Televisions",
                },
                {
                  value: "2",
                  name: "Cameras",
                },
                {
                  value: "3",
                  name: "Phones",
                },
              ]}
              handleChange={(e) => setCategoryId(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={imageUrl}
              handleChange={(e) => setImageUrl(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={price}
              handleChange={(e) => setPrice(e.target.value)}
            />

            <CKEditor
              onChange={(evt) => setDescription(evt.editor.getData())}
            />

            <br />

            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product, index) => {
                        const {productName, imageUrl, price, productId} =
                          product

                        return (
                          <tr key={index}>
                            <td>
                              <img className="thumb" src={imageUrl} />
                            </td>
                            <td>{productName}</td>
                            <td>£{price}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProductStart(productId))
                                }
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
