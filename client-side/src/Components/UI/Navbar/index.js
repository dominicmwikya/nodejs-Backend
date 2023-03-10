import React,{useContext, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../../../ContextAPI/AuthContext';
const Index = () => {
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
            <NavDropdown.Item href="/orders">
            Orders
            </NavDropdown.Item>
            <NavDropdown.Item href="/purchases">Purchases</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='actions'   id="collasible-nav-dropdown">
            <NavDropdown.Item >{user.username}</NavDropdown.Item>
            <NavDropdown.Item><button onClick={handleLogout}>Logout</button></NavDropdown.Item>
            </NavDropdown>
          </>
        ):
        (
          <>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          </>
        )
        
      }
             {console.log("username"+ user.username)}
            
             </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
	);
};
export default Index;
