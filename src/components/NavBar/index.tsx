import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image'
import {RiUser3Fill} from 'react-icons/ri';
import logo from '../../assets/logo.png';
import "./navbar.css";

export default function NavBar() {
  let navigate = useNavigate();
  return (
    <>
      <Navbar fixed='top' bg="light" expand="lg" variant="light">
        <Container fluid>
          <Navbar.Brand href="#"><Image fluid src={logo} width={70} height={70} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/" className='itemMenu'><Nav.Link as="span">Início</Nav.Link></Link>
              <Link to="/incluir/jogo" className='itemMenu'><Nav.Link as="span">Incluir</Nav.Link></Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Pesquise o jogo..."
                className="me-2"
                aria-label="Search"
              />
              <Button  variant="outline-success" className="me-4">Procurar</Button>

              <Button onClick={()=>navigate('/login')} variant="outline-primary" className=' d-flex align-items-center justify-content-center mx-3' style={{padding:10}}>
              <RiUser3Fill /> 
              Logar
            </Button>
            </Form>
           
          </Navbar.Collapse>
         
        </Container>
      </Navbar>
    </>
  )
}