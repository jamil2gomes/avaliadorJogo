import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image'
import logo from '../../assets/logo.png';
export default function NavBar() {
  return (
    <>
      <Navbar fixed='top' bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#"><Image roundedCircle fluid src={logo} width={70} height={70} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Início</Nav.Link>
              <Nav.Link href="#action2">Incluir</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Pesquise o jogo..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Procurar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}