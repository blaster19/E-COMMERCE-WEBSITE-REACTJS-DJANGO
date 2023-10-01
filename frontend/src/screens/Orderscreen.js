//sb-5mjyk27287097@personal.example.com
//foodorder

import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Messageorderscreen from './Messageorderscreen'
import Loader from './Loader'
import { getOrderDetails,payOrder } from '../actions/orderAction'
import { ORDER_PAY_RESET } from '../constants/orderConstant'

function Orderscreen(props) {
    
    
    const {id} = useParams()
    const dispatch = useDispatch()

    const navigate=useNavigate()
    const [sdkReady, setSdkReady] = useState(false)
    

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails
    const cart = useSelector(state => state.cart)
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
    // const orderDeliver = useSelector(state => state.orderDeliver)
    // const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    // if (!loading && !error) {
    //     order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    // }
    //alert(order.totalPrice)

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AfRHaP6G8Cf10KYGTuCopdPbCg1F8aiBAS040dgvTDzAaBPyART33IsvUT95ABM0Jev9fb80n8tRWnO_'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
     
  
           
    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }

        if (!order  ||successPay|| order.id !== parseInt(id) ) 
        {
            dispatch({ type: ORDER_PAY_RESET })
            //dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))

        }
         else if (!order.isPaid) {
            
         
            if (!window.paypal) {
                addPayPalScript()
                
            } else {
                setSdkReady(true)

            }
        }
      
    }, [dispatch, order,id,successPay,navigate,userInfo])

   
    
    
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }
    //const  totalprice=toString(parseFloat(order.totalPrice)/80)
    // const deliverHandler = () => {
    //     dispatch(deliverOrder(order))
    // }
    
    return loading ? (
        <Loader />
    ) : error ? (
        <Messageorderscreen var='danger' message={error}></Messageorderscreen>
    ) : (
                <div style={{paddingTop:"5%"}}>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush' style={{border:`2px solid ${props.color==='black'?'white':'black'}`}}>
                                <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                    <h2 style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Delivery Address</h2>
                                    <p style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}><strong>Name: </strong> {order.user.name}</p>
                                    <p style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}><strong>Email: </strong>{order.user.email}</p>
                                    <p style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>
                                        <strong>Shipping: </strong>
                                        {cart.shippingAddr.addr},  {cart.shippingAddr.city}
                                        {'  '}
                                        {'  '}
                                        {cart.shippingAddr.pincode}
                                    </p>

                                    {order.isDelivered ? (
                                        <Messageorderscreen var='success' message={"Delivered on"} delivered={order.deliveredAt.toString().slice(0,10).split("-").reverse().join("-")}></Messageorderscreen>
                                    ) : (
                                            <Messageorderscreen var='danger' message={"Not Delivered"}></Messageorderscreen>
                                        )}
                                </ListGroup.Item>

                                <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                    <h2 >Payment</h2>
                                    <p >
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order && order.isPaid ? (
                                        <Messageorderscreen var='success' message={"Paid on "} paid={order.paidAt.toString().slice(0,10).split("-").reverse().join("-")}></Messageorderscreen>
                                    ) : (
                                            <Messageorderscreen var='danger' message={"Not Paid"}></Messageorderscreen>
                                        )}

                                </ListGroup.Item>

                                <ListGroup.Item >
                                    <h2 >Order Items</h2>
                                    { order.orderItems && order.orderItems.length === 0 ? <Messageorderscreen var='info' message={"Order is empty"}>
                                        
                            </Messageorderscreen> : (
                                            <ListGroup variant='flush'>
                                                {order.orderItems && order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index} style={{backgroundColor:`${props.color}`}}>
                                                        <Row style={{color:`${props.color==='black'?'white':'black'}`}}>
                                                            <Col md={1} >
                                                                <Image src={item.img} alt={item.name} fluid rounded />
                                                            </Col>

                                                            <Col style={{userSelect:'none'}}>
                                                                {item.name}
                                                            </Col>

                                                            <Col md={4} style={{userSelect:'none'}}>
                                                                {item.quantity} X ₹{item.price} = ₹{(item.quantity * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                    )}                                </ListGroup.Item>

                            </ListGroup>

                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush' style={{border:`2px solid ${props.color==='black'?'white':'black'}`}}>
                                    <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                        <h2 style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Order Summary</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                        <Row style={{color:`${props.color==='black'?'white':'black'}`}}>
                                            <Col style={{userSelect:'none'}}>Items:</Col>
                                            <Col style={{userSelect:'none'}}>₹{order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                        <Row style={{color:`${props.color==='black'?'white':'black'}`}}>
                                            <Col style={{userSelect:'none'}}>Shipping:</Col>
                                            <Col style={{userSelect:'none'}}>₹{order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                        <Row style={{color:`${props.color==='black'?'white':'black'}`}}>
                                            <Col style={{userSelect:'none'}}>Tax:</Col>
                                            <Col style={{userSelect:'none'}}>₹{order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                        <Row style={{color:`${props.color==='black'?'white':'black'}`}}>
                                            <Col style={{userSelect:'none'}}>Total:</Col>
                                            <Col style={{userSelect:'none'}}>₹{order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                </ListGroup>
                            
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
}

export default Orderscreen