import React from "react";
//componentes
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import "./detalhes.css";
import logo from '../../assets/controle-jogo.png';

const Detalhes = () => {

    return (
        <Container fluid className="containerDetalhe">
            <header className="headerDetalhe">
                
                    <Image src={logo} rounded width={100} height={120} />
                    <div className="ms-2">
                    <h3>Título de Jogo</h3>
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Sinopse</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </div>
            </header>
        </Container>
    )
}

export default Detalhes;