import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavbarPage = () => {
  return (
    <Navbar style={{height:"50px"}} expand="lg" className="bg-body-tertiary d-flex align-items-center justify-content-between">
      <Container className='d-flex align-items-center justify-content-between'>
        <Navbar.Brand href="#home">Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/home">About</Nav.Link>
            <Nav.Link href="/home">Servies</Nav.Link>
            <Nav.Link className='active' href="/home">Blog</Nav.Link>
            <Nav.Link href="/home">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
