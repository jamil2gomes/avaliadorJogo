import React,{useEffect} from "react";
import { Link, useParams } from "react-router-dom";
//componentes
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Container from "react-bootstrap/Container";
import Image     from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Badge     from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button    from "react-bootstrap/Button";


//estilos
import "./detalhes.css";

//imagens
import { RiWindowsFill, RiPlaystationFill, RiXboxFill, RiAndroidFill, RiAppStoreFill, RiAddCircleLine } from "react-icons/ri";
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
        A: 0,
        B: 5,
        fullMark: 10,
    },
    {
        subject: 'Navegabilidade',
        A: 4,
        B: 5,
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

    const {id} = useParams();

    useEffect(()=>{mediaNotas();},[]);

    function mediaNotas()
    {
        console.log(id)
    }

    function retornaCorDaNota(nota:number){
        if(nota>=7 && nota <=10)
            return "#008000";
        if(nota>=5 && nota < 7)
            return "#FFA500";
        
        return "#FF0000";
    }

    return (
        <Container fluid className="containerDetalhe">
            <header className="headerDetalhe">
                <Image src={logo} rounded width={100} height={90} />
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

            <main>
                <ResponsiveContainer className="my-3" width="100%" height={200}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="NomeJogo" dataKey="B" stroke="#0F8F2E" fill="#27DC53" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>

                <section className="sectionPlataformas">
                    <Badge pill bg="secondary"><RiWindowsFill />Win</Badge>
                    <Badge pill bg="secondary"><RiPlaystationFill />Ps4</Badge>
                    <Badge pill bg="secondary"><RiPlaystationFill />Ps5</Badge>
                    <Badge pill bg="secondary"><RiXboxFill />Xbox</Badge>
                </section>

                <section className="listagemMetricasComNotas my-3">
                    <ListGroup as="ul" variant="flush" >
                        {
                            data.map((item, index) => (
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
                    <span className="notaMetrica my-2" style={{backgroundColor:retornaCorDaNota(6.2)}}>6.2</span>
                    
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