import React,{useEffect,useState} from 'react'
import { useNavigate,useLocation, useParams } from 'react-router-dom'
import { Button,Row,Col,ListGroup,Image,Card,ListGroupItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { ORDER_CREATE_RESET } from '../constants/orderConstant'
import Checkout from '../components/Checkout'
import Message from '../components/Message'
import { createOrder, payOrder } from '../actions/orderAction'
import Loader from './Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import 'react-toastify/dist/ReactToastify.min.css';

const PlaceOrderScreen = () => {
  const [toEmail, setToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
 const navigate=useNavigate()

 const dispatch=useDispatch()

  const cart =useSelector(state=>state.cart)
  const userLogin=useSelector(state=>state.userLogin)
  const [sdkReady, setSdkReady] = useState(false)


 
  
  cart.itemsPrice= parseFloat(cart.cartItems.reduce((acc,item)=> acc+item.price*item.qty,0).toFixed(2))
  cart.shippingPrice= parseFloat(cart.itemsPrice>699?0:68)

  cart.taxPrice=parseFloat((cart.itemsPrice*5/100).toFixed(2))
  cart.totalPrice=(cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2)
  
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, error, success } = orderCreate

 
  


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


async function successPaymentHandler()
{ 
    toast.success("Order Placed Successfully",{autoClose:3000})
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddr,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
  }))
    
}


  
   

  if(!cart.paymentMethod){
    navigate('/payment')
  }







 

  useEffect(() => {


    if (!window.paypal) {
      addPayPalScript()
       
      
  } 
  else {
      setSdkReady(true)
      
  }
  
   if (success ) {
    let subjectcontent=`HI ${order?.user.name.toUpperCase()} YOUR ORDER IS SUCCESSFULLY PLACED!!`
    let messagecontent=""
    messagecontent+="YOUR ORDER DETAILS:"+"\n"
    const sendmessage=async ()=>{order && 
        order.orderItems.map((i)=>{
  
            messagecontent=messagecontent+i.name.toString()+"\n";
            
            return messagecontent;}
            )}
            sendmessage()
            messagecontent+="TOTAL PRICE: ₹"+order?.totalPrice+"\n";
  

            const serviceId = 'service_orjz1xl';
  const templateId = 'template_jt13skl';
  const userId = '8fjSPMVqybyrXa9UM';
  const emailParams = {
    to_email: `${order?.user.email}`,
    subject: `${subjectcontent}`,
    message: `${messagecontent}`,
      to_name:`${order?.user.name}`,
    };
    
            
      emailjs.send(serviceId, templateId, emailParams, userId)
      .then((response) => {
        console.log('Email sent successfully:', response);
        messagecontent="";
        setMessage('')
        setSubject('')
        setToEmail('')
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });




    setTimeout(()=>{
      
      
      navigate("/profile")
      dispatch({ type: ORDER_CREATE_RESET })
      
    },3000)
      
    }
    

}, [success,dispatch,sdkReady,order])


  return (
    <div  >
    <ToastContainer style={{height:'10px',width:'300px'}}></ToastContainer>
  <Checkout step1 step2 step3 step4/>
    
  <Row>
    <Col md={8}>
      <ListGroup variant='flush'>
        <ListGroupItem>
          <h2>Shipping</h2>

          <p>
            <b>Name:</b>
            {'  '}{userLogin.userInfo.name}
          </p>

          <p>
            <b>Address:</b>{'  '}
            {cart.shippingAddr.addr},{'  '}{cart.shippingAddr.city} {'   '}, {cart.shippingAddr.pincode}
          </p>
        </ListGroupItem>


        <ListGroupItem>
          <h2>Payment Method</h2>

          <p>
            <b>Method:</b>{'  '}
             {cart.paymentMethod}
          </p>
        </ListGroupItem>

        <ListGroupItem>
          <h2>Order Items</h2>


          {cart.cartItems.length===0? <Message variant='info'>
            CART IS EMPTY
          </Message>:

          <ListGroup variant='flush'>
              {cart.cartItems.map((item,index)=>(
                <ListGroupItem key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid className='mx-auto d-block' style={{height:'31px',width:'57px'}}/>
                    </Col>


                   
                    <Col>
                      
                        {item.name}
                      
                    </Col>
                    


                    <Col md={4}>
                      {item.qty} X  ₹{item.price} = ₹{(item.qty*item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
          </ListGroup>}

          
        </ListGroupItem>

      </ListGroup>
    </Col>


    <Col md={4}>

          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                  <h2>Order Summary</h2>
              </ListGroupItem>

              <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>₹{cart.itemsPrice}</Col>
                  </Row>
              </ListGroupItem>


              <ListGroupItem>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>₹ {cart.shippingPrice}</Col>
                  </Row>
              </ListGroupItem>


              <ListGroupItem>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>₹{cart.taxPrice}</Col>
                  </Row>
              </ListGroupItem>


              <ListGroupItem>
                  <Row>
                    <Col>Total:</Col>
                    <Col>₹{cart.totalPrice}</Col>
                  </Row>
              </ListGroupItem>


              <ListGroupItem>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroupItem>


              <ListGroupItem>
              

           { !sdkReady ? (
                <Loader />
            ) : (
                <PayPalButton
                amount={cart.totalPrice}
                onSuccess={successPaymentHandler}
                disabled={cart.itemsPrice===0}
                 
                />
            )}
        
            

              </ListGroupItem>

            </ListGroup>

          </Card>


    </Col>
  </Row>
     
    </div>
  )
}

export default PlaceOrderScreen
