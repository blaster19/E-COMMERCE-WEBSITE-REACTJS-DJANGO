import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Homescreen from './screens/Homescreen'
import Productsreen from './screens/Productscreen'
import Cartscreen from "./screens/Cartscreen";
import {HashRouter as Router,Route,Routes} from 'react-router-dom'
import LoginScreen from "./screens/LoginScreen";
import Registerscreen from "./screens/Registerscreen";
import ShippingScreen from "./screens/ShippingScreen";
import Payment from './screens/Payment'
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import ProfileScreen from "./screens/ProfileScreen";
import Orderscreen from "./screens/Orderscreen";
const App = () => {
  return (
    <Router>
      <Header />
      <div className="py-3">
        <Container >
          <Routes>
            <Route exact path="/"  element={<Homescreen/>}/>
            <Route path="/product/:id"  element={<Productsreen />} />
            <Route path="/cart/:id?"  element={<Cartscreen />} />
            <Route path="/user/login"  element={<LoginScreen />} />
            <Route path="/user/register"  element={<Registerscreen />} />
            <Route path="/shipping"  element={<ShippingScreen />} />
            <Route path="/payment"  element={<Payment />} />
            <Route path="/placeorder"  element={<PlaceOrderScreen />} />
            <Route path="/profile"  element={<ProfileScreen />} />
            <Route path="/orders/:id"  element={<Orderscreen />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
