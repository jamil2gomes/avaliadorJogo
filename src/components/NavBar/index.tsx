import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image'
import logo from '../../assets/logo.png';
import "./navbar.css";

export default function NavBar() {
  return (
    <>
      <Navbar fixed='top' bg="light" expand="lg" variant="light">
        <Container fluid>
          <Navbar.Brand href="#"><Image roundedCircle fluid src={logo} width={70} height={70} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/" className='itemMenu'><Nav.Link as="span">Início</Nav.Link></Link>
              <Link to="/incluir" className='itemMenu'><Nav.Link as="span">Incluir</Nav.Link></Link>
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