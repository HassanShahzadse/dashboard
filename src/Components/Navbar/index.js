import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import './Navbar.css';


function NavBar() {
  const userName = localStorage.getItem('userName');
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="Navbar-container">
      <Container>
        <Navbar.Brand href="#home">
          <span className="navbar-logo">Dashboard</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#profile">
              <img
                src="avatar.webp" // Replace with the actual image URL
                alt="User Profile"
                className="rounded-circle user-profile-img"
              />
              {userName}
            </Nav.Link>
            <Button variant="outline-light" onClick={handleSignout} className="ms-3">Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function handleSignout() {
  localStorage.clear();
  setTimeout(() => {
      window.location.href = '/login';
  }, 1000);
}

export default NavBar;
