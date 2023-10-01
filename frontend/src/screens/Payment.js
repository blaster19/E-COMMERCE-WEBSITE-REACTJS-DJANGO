import React,{useEffect,useState} from 'react'
import { useNavigate,useLocation,useParams } from 'react-router-dom'
import { Form,Button,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {savePaymentMethod} from "../actions/cartAction"
import Checkout from '../components/Checkout'

const Payment = () => {

    const cart= useSelector(state=>state.cart)
    const {shippingAddr}= cart
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [paymentMethod,setPaymentMethod]=useState('PhonePe')

    if(!shippingAddr.address){
        navigate(`/shipping`)
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate(`/placeorder`)
    }


  return (
    <FormContainer>
      <Checkout step1 step2 step3/>

      <Form onSubmit={submitHandler}>

        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check type='radio' label='Paypal or Credit Card' id='phonepe' name='paymentmethod' checked onChange={(e)=>{setPaymentMethod(e.target.value)}}>

                </Form.Check>
            </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default Payment
