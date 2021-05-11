import React, {useState, useEffect} from "react"
import {apiInstance} from "./../../Utils"

import {useDispatch, useSelector} from "react-redux"
import {useHistory, useParams} from "react-router-dom"
import {fetchProductsStart} from "./../../redux/Products/products.actions"
import Product from "./Product"
import FormSelect from "./../forms/FormSelect"
import LoadMore from "./../LoadMore"
import "./styles.scss"



const mapState = ({productsData}) => ({
  products: productsData.products,
})

const ProductResults = ({}) => {
  const [Products, setProducts] = useState([])

  useEffect(() => {
    function componentDidMount() {
      return apiInstance
        .get("/Product/getall")
        .then((response) => {
          setProducts(response.data.data)
          console.log(Products)
        })
        .catch((err) => console.log(err))
    }
    componentDidMount()
  })

  const dispatch = useDispatch()
  const history = useHistory()
  const {filterType} = useParams()
  const {products} = useSelector(mapState)

  const {data, queryDoc, isLastPage} = products

  useEffect(() => {
    dispatch(fetchProductsStart({filterType}))
  }, [filterType])

  const handleFilter = (e) => {
    const nextFilter = e.target.value
    history.push(`/search/${nextFilter}`)
  }
  /* 
  if (!Array.isArray(data)) return null
  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    )
  } */

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Laptops",
        value: "0",
      },
      {
        name: "Televisions",
        value: "1",
      },
      {
        name: "Cameras",
        value: "2",
      },
      {
        name: "Phones",
        value: "3",
      },
    ],
    handleChange: handleFilter,
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    )
  }

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  }
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="products">
      <h1>Browse Products</h1>
      <input type = "text" placeholder ="Search ..."  
      onChange={event => {
        setSearchTerm(event.target.value)} } />
      <FormSelect {...configFilters} />

      <div className="productResults">
        {Products.filter((val)=>{
          if(searchTerm == ""){
            return val
          }else if(val.productName.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
          }else if(val.description.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
          }

        }).map((product, pos) => {
          const {imageUrl, productName, price} = product
          if (!imageUrl || !productName || price === "undefined") return null

          const configProduct = {
            ...product,
          }

          return <Product key={pos} {...configProduct} />
        })}
      </div>

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  )
}

export default ProductResults
