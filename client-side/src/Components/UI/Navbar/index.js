import React,{useContext, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../../../ContextAPI/AuthContext';
const Index = ({logout}) => {
  const {user, handleLogout}=useContext(AuthContext)
	return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">myStock</Navbar.Brand>
     
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto"> 
      { 
        user.isLogged? (
          <>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/users">users</Nav.Link>
            <NavDropdown title="Items" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/items">Item List</NavDropdown.Item>
            <NavDropdown.Item href="/receive">
            Receive Items
            </NavDropdown.Item>
            <NavDropdown.Item href="/purchase">Purchase items</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link><button onClick={handleLogout}>Logout</button></Nav.Link>
          </>
        ):
        (
          <>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          </>
        )
        
      }
             
            
             </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
	);
};
export default Index;
