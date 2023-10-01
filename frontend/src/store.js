import {combineReducers, applyMiddleware,legacy_createStore} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer} from './reducers/Userreducer'
import { orderCreateReducer,orderPayReducer,orderDetailsReducer } from './reducers/orderReducer'



const reducer =combineReducers({
    productList:productListReducer,
    productDetails:productDetailReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer,
    orderPay:orderPayReducer,
    orderDetails:orderDetailsReducer,
})

const cartItemsFromStorage=localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null


const shippingddrInfoFromStorage=localStorage.getItem("shippingAddr")?JSON.parse(localStorage.getItem("shippingAddr")):null



const initialState={
  cartItems:{cartItemsFromStorage,  shippingAddr:shippingddrInfoFromStorage},
  userLogin:{userInfo:userInfoFromStorage}
}

const middleware=[thunk]
const store=legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


  export default store