import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card, ListGroupItem,Alert,Form} from 'react-bootstrap'
import { useParams,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { listProductDetails} from '../actions/productActions';
import Loader from '../Loader'



const Productscreen = () => {
    const { id }= useParams();
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const productDetails = useSelector(state=> state.productDetails)
    const {error,loading,product}=productDetails

    const [qty,setQty]=useState(1)


    useEffect(()=>{
  
          dispatch(listProductDetails(id))
          },[dispatch,id])


          const addCartHandler=()=>{
          
                navigate(`/cart/${id}?qty=${qty}`)
            
          }

       
  return (<>{loading?<Loader/>:error?<Alert variant='danger'>{error}</Alert>:
    <div>
        <Link to="/" exact className='btn btn-light my-3'>Go Back</Link>

        <Row>
            <Col md={6} >
                <Image src={product.image} alt={product.name} className='mx-auto d-block' fluid  style={{height:"400px",width:"400px"}}></Image>
            </Col>

            <Col md={3}>
                <ListGroup>
                    <ListGroupItem variant='dark'>
                        <h3>{product.name}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h3>₹{product.price}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                        <p>{product.description}</p>
                    </ListGroupItem>
                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col >
                                    {product.countInStock>0 ? 'In Stock' : 'Out Of Stock'}
                                </Col>
                            </Row>
                        </ListGroupItem>


                {product.countInStock>0 &&
                        <ListGroup.Item>
                            <Row>
                                <Col>QTY</Col>
                                <Col xs='auto' className='my-1' style={{marginRight:"20%"}}>
                                    <Form.Control as="select" value={qty}
                                    onChange={(e)=> {setQty(e.target.value)}} >

                                  {  [...Array(product.countInStock).keys()].map((x)=>(
                                    <option value={x+1} key={x+1}>
                                        {x+1}
                                    </option>
                                  ))}

                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                }



                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col ><b>₹{product.price}</b> </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                                
                            {product.countInStock!==0 ? (<Button className='btn-block align-item-center' type='button'  disabled={product.countInStock === 0} onClick={addCartHandler}>ADD TO CART </Button>): (<p>Out of stock</p>)}
                        
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
}</>)
}

export default Productscreen




