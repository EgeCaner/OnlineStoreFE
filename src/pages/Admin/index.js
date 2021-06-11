import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
  setProduct,
  updateProductStart,
  discountProductStart
} from "./../../redux/Products/products.actions"
import Modal from "./../../components/Modal"
import FormInput from "./../../components/forms/FormInput"
import FormSelect from "./../../components/forms/FormSelect"
import Button from "./../../components/forms/Button"
import LoadMore from "./../../components/LoadMore"
import CKEditor from "ckeditor4-react"
import "./styles.scss"
import{ checkUserIsAdmin,checkUserIsProduct,checkUserIsSales} from "./../../Utils/index"

const mapState = ({productsData, user}) => ({
  products: productsData.products,
  currentUser: user.currentUser
})

let quant = 0
const Admin = (props) => {
  const {products, currentUser} = useSelector(mapState)
  const dispatch = useDispatch()
  const [hideModal, setHideModal] = useState(true)
  const [categoryId, setCategoryId] = useState("0")
  const [quantity, setQuantity] = useState("0")
  const [productName, setProductName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [productIdD, setproductIdD] = useState("")
  const [discount, setdiscount] = useState("0")
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
    setQuantity("0")
  }
  const handleChangeQuantity = (e) => {
    e.preventDefault()
    quant = e.target.value
    console.log(quant)

    dispatch(
      setProduct({
        categoryId,
        productName,
        imageUrl,
        price,
        description,
        quantity,
      })
    )
    setQuantity(e.target.value)
    console.log(quantity)
    resetForm()
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
        quantity,
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
  const handleSubmitDiscount = () => {
    
      console.log('ID',productIdD)
      console.log('dscount',discount)
      dispatch(discountProductStart({
        productIdD,
        discount
      })

      )
  }

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  }


  return (
    <div className="admin">
       {checkUserIsProduct(currentUser ) &&  <div className="callToActions">
        <ul>
          <li>
           
      <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>}
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
                  value: "1",
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

          <Button type="submit" id ='orderbutton2'>Add product</Button>
          </form>
        </div>
      </Modal>
      <Link id ='orderbutton' to="/orders">Orders</Link> 
      
      {checkUserIsSales(currentUser ) && <Link id ='orderbutton' to="/Analytics">Analytics</Link> }
      <div>
      
      {checkUserIsSales(currentUser ) && <form id= "adminorderform">
      <label> <h4>Discount Form:</h4></label>
      <br></br>

  <label id="adminorderlabel">
  ProductId:

    <input id="adminorderinput1" type="text" name="Product Id" onChange = {(e) => setproductIdD(e.target.value)}/>
    
  </label>
  <br></br>
  <label id="adminorderlabel">
  Discount Rate:
    <input id="adminorderinput2" type="text" name="Discount Rate" onChange = {(e) => setdiscount(e.target.value)}/>
  </label>
  <br></br>

</form>}
<br></br>
{checkUserIsSales(currentUser ) && <Button onClick={() => handleSubmitDiscount()}>Submit</Button>}
      </div>

      <Link id="orderbutton" to="/commentmanage">
        Manage Comments
      </Link>
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
                    {Array.isArray(products) &&
                      products.length > 0 &&
                      products.map((product, index) => {
                        const {
                          productName,
                          imageUrl,
                          price,
                          productId,
                          quantity,
                          isdelete,
                        } = product
                        console.log("quantity:", {quantity}, "name:", {
                          productName,
                        })
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
                            <td>
                              <label>Current Stock: {quantity}</label>
                              <br></br>

                              <input
                                name="Quantity"
                                onChange={handleChangeQuantity}
                              />
                              <Button
                                onClick={() =>
                                  dispatch(
                                    updateProductStart({
                                      ...product,
                                      quantity: quant,
                                    })
                                  )
                                }
                              >
                                Update
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
