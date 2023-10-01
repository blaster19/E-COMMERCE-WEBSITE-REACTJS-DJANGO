
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Routes, Route, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { NavDropdown} from 'react-bootstrap'
import { logout } from '../actions/Useractions'
import { useDispatch, useSelector } from "react-redux";
import brandimg from './brandimg.png'




function Header() {
  const dispatch = useDispatch();
  const userLogin=useSelector((state)=>state.userLogin)
  const{userInfo}=userLogin
  function logouthandler(){
    dispatch(logout())
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary "  collapseOnSelect >
      <Container fluid>

      <LinkContainer to="/">
        <Navbar.Brand >
            <img
              src={brandimg}
              width="50"
              height="50"
              className="d-inline-block align-top "
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        
        </LinkContainer>
      {/* <LinkContainer to="/">
      
        <Navbar.Brand >B/W</Navbar.Brand>
        </LinkContainer> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

<LinkContainer to="/" exact>
            <Nav.Link > <i className='fas fa-home'></i> Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cart">
            <Nav.Link > <i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
            </LinkContainer>
            {userInfo?(<>
                 
                 <NavDropdown  title={<span style={{userSelect:"none"}}>
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   width="20"
                   height="20"
                   fill="currentColor"
                   class="bi bi-person-fill"
                   viewBox="0 2 16 16"
                 >
                   <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                 </svg>{" "}
                   {userInfo.name}</span>} id="username">
                   <NavDropdown.Item  style={{userSelect:"none"}}>
                   <Link style={{textDecoration:"none ",color:"#555555"}}  to="/profile" className="nav-link" data-toggle="collapse"
                   data-target="#navbarNav">Profile</Link>
                   </NavDropdown.Item>
                   
                   <NavDropdown.Item onClick={logouthandler}  style={{userSelect:"none"}}>
                     <Link to="/" className="nav-link" style={{textDecoration:"none",color:"#555555"}}>Logout</Link>
                   </NavDropdown.Item>
                 </NavDropdown>
                 </>):(<Link className="nav-link" to="/user/login" >
               <div
                 style={{
                 userSelect:"none"
                 }}
               >
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   width="20"
                   height="20"
                   fill="currentColor"
                   class="bi bi-person-fill"
                   viewBox="0 0 16 16"
                 >
                   <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                 </svg>{" "}
                 Login
               </div>
             </Link>)}
           
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;