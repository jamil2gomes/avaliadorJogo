import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//componentes
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import Loading from "../../components/Loading";
import MsgErro from "../../components/MsgErro";
//utilitarios
import { retornaCorDaNota } from "../../util";

//estilos
import "./detalhes.css";

//imagens
import { RiWindowsFill, RiPlaystationFill, RiXboxFill, RiAndroidFill, RiAppStoreFill, RiAddCircleLine } from "react-icons/ri";
import { FaInternetExplorer } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';

import logo from '../../assets/jogogenerico.png';
import { DetalhesJogo } from "../../interfaces";
import { pegarDetalhesDoJogoPelo } from "../../services/telaDetalhesJogo";

const data =
{
    ps4: [
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
    win: [
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


type PlataformaBadge = {
    [index: string]: () => JSX.Element;
}

const plataformaBadges: any = {
    'Android': <RiAndroidFill />,
    'IOS': <RiAppStoreFill />,
    'Navegador Web': <FaInternetExplorer />,
    'Steam': <RiWindowsFill />,
    'Nintendo Switch': <SiNintendoswitch />,
    'Xbox Series S/X': <RiXboxFill />,
    'Xbox 360': <RiXboxFill />,
    'Xbox One': <RiXboxFill />,
    'Playstation 3': <RiPlaystationFill />,
    'Playstation 4': <RiPlaystationFill />,
    'Playstation  5': <RiPlaystationFill />,
}

const Detalhes = () => {
    const [loading, setLoading] = useState(false);
    const [msgErr, setMsgErro] = useState(false);
    const [msgErrText, setMsgErroText] = useState('');
    const [jogo, setJogo] = useState<DetalhesJogo>({} as DetalhesJogo);

    const [notasDaPlataforma, setNotasDaPlataforma] = useState(data.ps4)
    const { id } = useParams();

    useEffect(() => { pegarDetalhesDoJogo(`${id}`) }, []);


    const pegarDetalhesDoJogo = async (id:any) => {
        setLoading(true);
        try {
            const response = await pegarDetalhesDoJogoPelo(id);
            setJogo(response.data);
        } catch (error: any) {
            setMsgErroText(`Ocorreu um erro ao carregar informações do jogo. Erro: ${error.status - error.message}`);
            setMsgErro(true);
        } finally {
            setLoading(false);
        }
    }

    function calcularMedia() {
        const soma = notasDaPlataforma.reduce((total, atual) => {
            return total + atual.B;
        }, 0);

        return soma / notasDaPlataforma.length;
    }


    return (
        <Container fluid className="containerDetalhe">
            {
                !loading ?
                    <>
                        <header className="headerDetalhe">
                            <Image src={logo} rounded width={100} height={100} />
                            <div className="ms-2">
                                <h3>{jogo.nome}</h3>
                                <Accordion flush style={{ borderWidth: 1, }}>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Sinopse</Accordion.Header>
                                        <Accordion.Body>
                                            {jogo.sinopse}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </header>

                        <main>
                            {/* GRAFICO */}
                            <ResponsiveContainer className="my-3" width="100%" height={200}>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={notasDaPlataforma}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar name="NomeJogo" dataKey="B" stroke="#000" fill="#27DC53" fillOpacity={0.8} />
                                </RadarChart>
                            </ResponsiveContainer>

                            <section className="sectionPlataformas">
                                {
                                    jogo.Plataformas?.map((item) => (
                                        <Badge key={item.id} pill bg="secondary" style={{width:'7rem'}} className="d-flex justify-content-between">
                                            {plataformaBadges[item.descricao]}
                                            {item.descricao}
                                        </Badge>
                                    ))
                                }
                            </section>


                            {/* NOTAS MEDIAS GERAL DO JOGO */}
                            <section className="listagemMetricasComNotas my-3">
                                <ListGroup as="ul" variant="flush" >
                                    {
                                        notasDaPlataforma.map((item, index) => (
                                            <ListGroup.Item as="li" key={index.toString()} action className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p>{item.subject}</p>
                                                </div>
                                                <div className="notaMetrica" style={{ backgroundColor: retornaCorDaNota(item.B) }}>
                                                    <span>{item.B}</span>
                                                </div>
                                            </ListGroup.Item>
                                        ))
                                    }

                                </ListGroup>
                            </section>

                            <section className="my-3 secaoNotaMediaEAdicionarNota">
                                <div className="containerInternoSecaoNotaMediaEAdicionarNota">
                                    <span className="notaMetrica my-2" style={{ backgroundColor: retornaCorDaNota(calcularMedia()) }}>{calcularMedia()}</span>

                                    <span style={{ fontSize: 12 }}>Nota da Comunidade</span>
                                    <span style={{ fontSize: 12 }}>Baseada em 123 avaliações</span>
                                </div>

                                <div className="containerInternoSecaoNotaMediaEAdicionarNota">
                                    <RiAddCircleLine className="my-2" size={'2.5em'} />
                                    <Link to={`/avaliar/${id}`}>
                                        <Button variant="info" style={{ color: "white" }}>Adicionar Nota</Button>
                                    </Link>
                                </div>
                            </section>

                            <aside className="fichaTecnica my-4">
                                <h3>Ficha do Jogo</h3>
                                <ListGroup variant="flush" as="ol">
                                    <ListGroup.Item as="li">
                                        <div>Nome</div>
                                        <span>{jogo.nome}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <div>Lançamento</div>
                                        <span>{jogo.data_lancamento}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <div>Plataformas</div>
                                        <span>
                                            {
                                                jogo.Plataformas?.map((item) => (
                                                    <Badge  key={item.id} pill bg="secondary">{item.descricao}</Badge>
                                                ))
                                            }
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <div>Modos de Jogo</div>
                                        <span>
                                            {
                                                jogo.Generos?.map(item => (
                                                    <Badge key={item.id} pill bg="secondary">{item.descricao}</Badge>
                                                ))
                                            }
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <div>Desenvolvedora</div>
                                        <span>
                                            <Badge pill bg="secondary">{jogo.desenvolvedora}</Badge>
                                        </span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </aside>
                        </main>

                    </> :
                    <Loading />
            }

            <MsgErro
                mensagem={msgErrText}
                show={msgErr}
                onHide={() => setMsgErro(false)}
            />

        </Container>
    )
}

export default Detalhes;