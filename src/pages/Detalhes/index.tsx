import React from "react";
//componentes
import Container from "react-bootstrap/Container";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import "./detalhes.css";
import logo from '../../assets/controle-jogo.png';

const data = [
    {
        subject: 'Jogabilidade',
        A: 8,
        B: 8,
        fullMark: 10,
    },
    {
        subject: 'Feedback',
        A: 7,
        B: 8,
        fullMark: 10,
    },
    {
        subject: 'Tipografia',
        A: 5,
        B: 7,
        fullMark: 10,
    },
    {
        subject: 'Navegabilidade',
        A: 9,
        B: 10,
        fullMark: 10,
    },
    {
        subject: 'Audio',
        A: 8,
        B: 9,
        fullMark: 10,
    },
];

const Detalhes = () => {

    return (
        <Container fluid className="containerDetalhe">
            <header className="headerDetalhe">
                <Image src={logo} rounded width={100} height={94} />
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

            <ResponsiveContainer className="my-2" width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="NomeJogo" dataKey="A" stroke="#0F8F2E" fill="#27DC53" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>


        </Container>
    )
}

export default Detalhes;