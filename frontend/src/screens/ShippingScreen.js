import React,{useEffect,useState} from 'react'
import { useNavigate,useLocation,useParams } from 'react-router-dom'
import { Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {saveShippingAddr} from "../actions/cartAction"
import Checkout from '../components/Checkout'
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { useRef } from "react";
const libraries = ['places'];
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
    const inputRef = useRef();

    const { isLoaded, loadError } = useJsApiLoader({googleMapsApiKey: process.env.AIzaSyD3GG7Qq1XgRMAcjPejT9spgnR4RZ9xzbU,libraries});

    const handlePlaceChanged = () => { 
        const [ place ] = inputRef.current.getPlaces();
        if(place) { 
              
            let list=place.formatted_address.split(',')
            let statepincodelist=list[list.length-2].split(' ')
            let streetplace=list.slice(0,list.length-3)
            setAddr(streetplace)
           
            setPincode(statepincodelist[2])
            setCity(list[list.length-3])
        }
    }
    function nullset(e)
{
            setAddr('')
            setPincode('')
            setCity('')
}
    
  return (
      <FormContainer>
        <Checkout step1 step2 />
        <h1>SHIPPING</h1>

        {isLoaded
        &&
        <StandaloneSearchBox onLoad={ref => inputRef.current = ref} onPlacesChanged={handlePlaceChanged}>
           <input
                type="text"
                className="form-control"
                placeholder="Search Here.."
                onChange={(e)=>{if(e.target.value===''){nullset()}}}
            />
        </StandaloneSearchBox>}
        <Form onSubmit={submitHandler}>
            
        {/* <Form.Group controlId='addr' className="pt-3 ">
    <Form.Label style={{userSelect:'none'}}>Address</Form.Label>
    <Form.Control
        required
        type='text'
        placeholder='Enter Address'
        value={addr ? addr : ""}
        onChange={(e) => setAddr(e.target.value)}
    >
    </Form.Control>
</Form.Group> */}



    
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
