import React, { useEffect } from 'react'
import {Link, useParams,useLocation, useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart,removeFromCart} from '../actions/cartAction'
import "./cartscreen.css"


function Cartscreen() {
  const {id} =useParams()
  const productId=id
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qty = queryParams.get("qty");
  
  const cart=useSelector(state=>state.cart)
  const {cartItems} = cart

  const dispatch=useDispatch()

  useEffect(()=>{
    if(productId){
        dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty]) 


  const removeFromCartHandler=(id)=>{
    dispatch(removeFromCart(id))
    
  }
  const navigate = useNavigate(); 


  const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

  const checkoutHandler = () => {
    if(userInfo)
    {
      navigate('/shipping'); 
    }
  }


  return (
    <Row>
      <Col md={8}>
        <h1>SHOPPING CART</h1>
        {cartItems.length===0?(
          <Message variant='info'>
            YOUR CART IS EMPTY<Link to="/" >Go Back</Link>
          </Message>
        ):
            <ListGroup variant='flush'>
                {cartItems.map(item =>(
                  <ListGroup.Item key={item.product}className='cart-item'>
                        <Row>
                          <Col ms={2}>
                              <Image src={item.image} alt={item.name} className='mx-auto d-block' fluid rounded ></Image>
                          </Col>

                          <Col md={3}>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>

                          <Col ms={2}>
                          ₹{item.price}
                          </Col>


                          <Col md={3}>
                          <Form.Control as="select" value={item.qty}
                                    onChange={(e)=> {dispatch(addToCart(item.product,parseInt(e.target.value)))}} >

                                  {  [...Array(item.countInStock).keys()].map((x)=>(
                                    <option value={x+1} key={x+1}>
                                        {x+1}
                                    </option>
                                  ))}

                                    </Form.Control>
                          </Col>


                          <Col md={1}>
                            <Button type='button' variant='light'  onClick={()=>{removeFromCartHandler(item.product)}}><i className='fas fa-trash'></i></Button>
                          </Col>
                        </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
        }
      </Col>
      <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem className='cart-item' >
                <h2>Subtotal  ({cartItems.reduce((acc,item)=>acc + parseInt(item.qty), 0)}) items</h2>

                ₹{cartItems.reduce((acc,item)=>acc + parseInt(item.qty)* item.price, 0).toFixed(2)}

              </ListGroupItem>
            </ListGroup>

            <ListGroupItem className='cart-item'>
              <Button type='button' className='btn-block ' disabled={cartItems.length===0}  onClick={checkoutHandler}>
                  PROCEED TO CHECKOUT
              </Button>
            </ListGroupItem>

          </Card>
      </Col>
    </Row>
  );
}

export default Cartscreen