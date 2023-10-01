import React,{useEffect,useState} from 'react'
import { useNavigate,useLocation,useParams } from 'react-router-dom'
import { Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {saveShippingAddr} from "../actions/cartAction"
import Checkout from '../components/Checkout'

const ShippingScreen = () => {

    const cart= useSelector(state=>state.cart)
    const {shippingAddr}= cart
    const [addr,setAddr]= useState(shippingAddr.addr)
    const [city,setCity]= useState(shippingAddr.city)
    const [pincode,setPincode]= useState(shippingAddr.pincode)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddr({addr,city,pincode}))
        navigate(`/payment`)
    }
    
  return (
      <FormContainer>
        <Checkout step1 step2 />
        <h1>SHIPPING</h1>
        <Form onSubmit={submitHandler}>
            
        <Form.Group controlId='addr' className="pt-3 ">
    <Form.Label style={{userSelect:'none'}}>Address</Form.Label>
    <Form.Control
        required
        type='text'
        placeholder='Enter Address'
        value={addr ? addr : ""}
        onChange={(e) => setAddr(e.target.value)}
    >
    </Form.Control>
</Form.Group>



    
<Form.Group controlId='city' className="pt-3 ">
    <Form.Label style={{userSelect:'none'}}>City</Form.Label>
    <Form.Control
        required
        type='text'
        placeholder='Enter City'
        value={city ? city : ""}
        onChange={(e) => setCity(e.target.value)}
    >
    </Form.Control>
</Form.Group>




<Form.Group controlId='pincode' className="pt-3 ">
    <Form.Label style={{userSelect:'none'}}>Pin Code</Form.Label>
    <Form.Control
        required
        type='text'
        placeholder='Enter Pincode'
        value={pincode ? pincode : ""}
        onChange={(e) => setPincode(e.target.value)}
    >
    </Form.Control>
</Form.Group>


<Button type='submit' variant='primary'>Continue</Button>

        </Form>
    </FormContainer>

    
  )
}

export default ShippingScreen
