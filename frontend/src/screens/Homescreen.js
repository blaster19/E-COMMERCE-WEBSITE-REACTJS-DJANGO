import React,{useEffect, useState} from 'react'
import { Row,Col,Alert} from 'react-bootstrap'
import Product from '../components/Product'
import Carousel from './Carousell'
import {useDispatch,useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../Loader'


const Homescreen = () => {
  const dispatch = useDispatch()
  const productlist=useSelector(state=> state.productList)
  const {error,loading,products}=productlist
  const [value,setValue]=useState("")

  useEffect(()=>{
          
    dispatch(listProducts())
   
       
   }

  ,[])


  




  return (<>{loading?<Loader/>:error?<Alert variant='danger'>{error}</Alert>:
    <div>
    <Carousel/>
      
      <h1 >Latest Products</h1>
      
      <Row>
        {products.map((product)=>{
            return<>
                <Col className='pt-5' key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            </>
        })}
      </Row>
    </div>
}</>)
}

export default Homescreen
