import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import DropdownButton  from "react-bootstrap/DropdownButton";
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image'
import logo from 'assets/icons8-joystick-100.png';


import "./navbar.css";
import useAuth from "hooks/useAuth";


interface NavBarProp extends FormControlProps{
  exibirPesquisa?:boolean;
 
}

const NavBar:React.FC<NavBarProp>= ({exibirPesquisa=true, ...rest}) =>{
  const {usuario, signOut} = useAuth();
  let navigate =  useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    window.location.href = window.location.href;
  }
  return (
    <>
      <Navbar fixed='top' bg="light" expand="lg" variant="light">
        <Container fluid>
        <Link to="/" className='itemMenu'><Navbar.Brand ><Image fluid src={logo} width={70} height={70} /> AutGamesFinder</Navbar.Brand></Link>
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
           {
             exibirPesquisa &&
             <Form className="d-flex">
             <FormControl
               type="search"
               placeholder="Pesquise o jogo..."
               className="me-2"
               aria-label="Search"
               {...rest}
             />
           </Form>
           }
            <DropdownButton  variant={usuario?'success':'primary'} id="dropdown-basic-button" title={usuario?`Olá, ${usuario.nome}`:'Olá, visitante '}>
              {
                !usuario &&
                <Dropdown.Item onClick={()=>navigate('/login')} >Logar</Dropdown.Item>
              }
              
              {
                usuario && 
                <Dropdown.Item onClick={()=>handleSignOut()}>Sair</Dropdown.Item>
              }
              </DropdownButton>
          </Navbar.Collapse>
         
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar;