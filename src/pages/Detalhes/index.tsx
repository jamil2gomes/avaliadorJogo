import React,{useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
//componentes
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Container from "react-bootstrap/Container";
import Image     from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Badge     from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button    from "react-bootstrap/Button";

//utilitarios
import { retornaCorDaNota } from "../../util";

//estilos
import "./detalhes.css";

//imagens
import { RiWindowsFill, RiPlaystationFill, RiXboxFill, RiAndroidFill, RiAppStoreFill, RiAddCircleLine } from "react-icons/ri";
import logo from '../../assets/jogogenerico.png';

const data = 
    {
        ps4:[
            {
                subject: 'Jogabilidade',
                B: 8,
            },
            {
                subject: 'Feedback',
                B: 7,
            },
            {
                subject: 'Tipografia',
                B: 3,

            },
            {
                subject: 'Navegabilidade',
                B: 5,
            },
            {
                subject: 'Audio',
                B: 10,

            },
        ],
        win:[
            {
                subject: 'Jogabilidade',
                B: 5,

            },
            {
                subject: 'Feedback',
                B: 2,

            },
            {
                subject: 'Tipografia',
                B: 5,

            },
            {
                subject: 'Navegabilidade',
                B: 5,

            },
            {
                subject: 'Audio',
                B: 4,
            },
        ]
    };

const Detalhes = () => {
    const [notasDaPlataforma, setNotasDaPlataforma] = useState(data.ps4)
    const {id} = useParams();

    function calcularMedia(){
        const soma = notasDaPlataforma.reduce((total, atual) => {
            return total + atual.B;
          },0);

          return soma/notasDaPlataforma.length;
    }


    return (
        <Container fluid className="containerDetalhe">
            <header className="headerDetalhe">
                <Image src={logo} rounded width={100} height={100} />
                <div className="ms-2">
                    <h3>Título de Jogo</h3>
                    <Accordion flush style={{borderWidth:1, }}>
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

            <main>
                <ResponsiveContainer className="my-3" width="100%" height={200}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={notasDaPlataforma}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="NomeJogo" dataKey="B" stroke="#000" fill="#27DC53" fillOpacity={0.8} />
                    </RadarChart>
                </ResponsiveContainer>

                <section className="sectionPlataformas">
                    <Badge pill bg="secondary" onClick={()=>{setNotasDaPlataforma(data.win)}}><RiWindowsFill />Win</Badge>
                    <Badge pill bg="secondary" onClick={()=>{setNotasDaPlataforma(data.ps4)}}><RiPlaystationFill />Ps4</Badge>
                    <Badge pill bg="secondary"><RiPlaystationFill />Ps5</Badge>
                    <Badge pill bg="secondary"><RiXboxFill />Xbox</Badge>
                </section>

                <section className="listagemMetricasComNotas my-3">
                    <ListGroup as="ul" variant="flush" >
                        {
                            notasDaPlataforma.map((item, index) => (
                                <ListGroup.Item as="li" key={index.toString()} action className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p>{item.subject}</p>
                                    </div>
                                    <div className="notaMetrica" style={{backgroundColor:retornaCorDaNota(item.B)}}>
                                        <span>{item.B}</span>
                                    </div>
                                </ListGroup.Item>
                            ))
                        }

                    </ListGroup>
                </section>

                <section className="my-3 secaoNotaMediaEAdicionarNota">
                   <div className="containerInternoSecaoNotaMediaEAdicionarNota">
                    <span className="notaMetrica my-2" style={{backgroundColor:retornaCorDaNota(calcularMedia())}}>{calcularMedia()}</span>
                    
                    <span style={{fontSize:12}}>Nota da Comunidade</span>
                    <span style={{fontSize:12}}>Baseada em 123 avaliações</span>
                  </div>
                     
                  <div className="containerInternoSecaoNotaMediaEAdicionarNota">
                    <RiAddCircleLine className="my-2" size={'2.5em'}/>
                    <Link to={`/avaliar/${id}`}>
                        <Button variant="info" style={{color:"white"}}>Adicionar Nota</Button>
                    </Link>
                  </div>          
                </section>

                <aside className="fichaTecnica my-4">
                  <h3>Ficha do Jogo</h3> 
                  <ListGroup variant="flush" as="ol">
                    <ListGroup.Item as="li">
                      <div>Nome</div>
                      <span>Nome do Jogo</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                    <div>Lançamento</div>
                      <span>2022</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                    <div>Plataformas</div>
                      <span>
                          <Badge pill bg="secondary">Android</Badge>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                    <div>Modos de Jogo</div>
                      <span>
                      <Badge pill bg="secondary">Plataforma</Badge>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                    <div>Desenvolvedora</div>
                      <span>
                      <Badge pill bg="secondary">Skynet INC.</Badge>
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </aside>
            </main>

        </Container>
    )
}

export default Detalhes;