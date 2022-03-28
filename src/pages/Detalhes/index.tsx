import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//componentes
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table'
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Loading from "../../components/Loading";
import MsgErro from "../../components/MsgErro";
//utilitarios
import { retornaCorDaNota } from "../../util";

//estilos
import "./detalhes.css";

//imagens
import {RiAddCircleLine,} from "react-icons/ri";


import logo from "../../assets/jogogenerico.png";
import { DetalhesJogo, MediaGeralJogo, MediasPorPlataforma } from "../../interfaces";
import {
    pegarDetalhesDoJogoPelo,
    pegarMediaDeAvaliacaoDoJogo,
    pegarMediaDeAvaliacaoDoJogoPorPlataformas,
} from "../../services/telaDetalhesJogo";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const data = {
    default: [
        {
            label: "Audio",
            value: 0,
        },
        {
            label: "Feedback",
            value: 0,
        },
        {
            label: "Cores",
            value: 0,
        },
        {
            label: "Interface",
            value: 0,
        },
    ],
};

const Detalhes = () => {
    const [loading, setLoading] = useState(false);
    const [msgErr, setMsgErro] = useState(false);
    const [msgErrText, setMsgErroText] = useState("");
    const [jogo, setJogo] = useState<DetalhesJogo>({} as DetalhesJogo);
    const [infoMediaJogo, setInfoMediaJogo] = useState<MediaGeralJogo>();
    const [notasDaPlataforma, setNotasDaPlataforma] = useState(data.default);
    const [mediaDoJogoPorPlataforma, setMediaDoJogoPorPlataforma] = useState<MediasPorPlataforma[]>([]);
    const { id } = useParams();

    useEffect(() => {
        pegarDetalhesDoJogo(`${id}`);
    }, [id]);

    function calcularMedia(...valores:string[]){

        const notas = valores.reduce((atual, total)=>parseFloat(total)+atual,0);

        return notas/valores.length;
    }

    const pegarDetalhesDoJogo = async (id: any) => {
        setLoading(true);
        try {
            const detalhesJogo = await pegarDetalhesDoJogoPelo(id);
            const mediaJogo = await pegarMediaDeAvaliacaoDoJogo(id);
            const mediaPorPlataforma = await pegarMediaDeAvaliacaoDoJogoPorPlataformas(id);
            setMediaDoJogoPorPlataforma(mediaPorPlataforma.data.medias);
            setJogo(detalhesJogo.data);
            setInfoMediaJogo(mediaJogo.data);
            
            let dadosProGrafico = [];
            for(let item in mediaJogo.data.medias){
                let dadoProGrafico = {label:'', value:0.0};
                dadoProGrafico.label = item;
                dadoProGrafico.value = mediaJogo.data.medias[item];
                dadosProGrafico.push(dadoProGrafico);
            }
            setNotasDaPlataforma(dadosProGrafico);
        } catch (error: any) {
            setMsgErroText(
                `Ocorreu um erro ao carregar informações do jogo. Erro: ${error.status - error.message
                }`
            );
            setMsgErro(true);
        } finally {
            setLoading(false);
        }
    };

    return (
       <>
            <NavBar exibirPesquisa={false}/>
             <Container fluid className="containerDetalhe">
            {!loading ? (
                <>
                    <header className="headerDetalhe">
                        <Image
                            src={jogo.imagem_url ?? logo}
                            rounded
                            width={100}
                            height={100}
                        />
                        <div className="ms-2">
                            <h3>{jogo.nome}</h3>
                            <Accordion flush style={{ borderWidth: 1 }}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Sinopse</Accordion.Header>
                                    <Accordion.Body>{jogo.sinopse}</Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </header>

                    <main>
                        {/* GRAFICO */}
                        {
                           infoMediaJogo?.medias && Object.keys(infoMediaJogo.medias).length !==0 &&
                            <ResponsiveContainer width="100%" height={200}>
                            <RadarChart
                                cx="50%"
                                cy="50%"
                                outerRadius="80%"
                                data={notasDaPlataforma}
                            >
                                <PolarGrid />
                                <PolarAngleAxis dataKey="label" />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                                <Radar
                                    name="Media"
                                    dataKey="value"
                                    stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                        }

            
                        {/* NOTAS MEDIAS GERAL DO JOGO */}
                        <section className="listagemMetricasComNotas my-3">
                            <h3>Notas do Jogo</h3>
                            <ListGroup as="ul" variant="flush">
                                <ListGroup.Item
                                    as="li"
                                    action
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <p>Áudio</p>
                                    </div>
                                    <div
                                        className="notaMetrica"
                                        style={{
                                            backgroundColor: retornaCorDaNota(
                                                infoMediaJogo?.medias.Audio ?? 0.0
                                            ),
                                        }}
                                    >
                                        <span>{infoMediaJogo?.medias.Audio ?? 0.0}</span>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    action
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <p>Feedback</p>
                                    </div>
                                    <div
                                        className="notaMetrica"
                                        style={{
                                            backgroundColor: retornaCorDaNota(
                                                infoMediaJogo?.medias.Feedback ?? 0.0
                                            ),
                                        }}
                                    >
                                        <span>{infoMediaJogo?.medias.Feedback ?? 0.0}</span>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    action
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <p>Cores</p>
                                    </div>
                                    <div
                                        className="notaMetrica"
                                        style={{
                                            backgroundColor: retornaCorDaNota(
                                                infoMediaJogo?.medias.Cores ?? 0.0
                                            ),
                                        }}
                                    >
                                        <span>{infoMediaJogo?.medias.Cores ?? 0.0}</span>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    action
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <p>Interface</p>
                                    </div>
                                    <div
                                        className="notaMetrica"
                                        style={{
                                            backgroundColor: retornaCorDaNota(
                                                infoMediaJogo?.medias.Interface ?? 0.0
                                            ),
                                        }}
                                    >
                                        <span>{infoMediaJogo?.medias.Interface ?? 0.0}</span>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </section>

                        <section className="my-3 secaoNotaMediaEAdicionarNota">
                            <div className="containerInternoSecaoNotaMediaEAdicionarNota">
                                {infoMediaJogo?.media ? (
                                    <span
                                        className="notaMetrica my-2"
                                        style={{
                                            backgroundColor: retornaCorDaNota(infoMediaJogo.media),
                                        }}
                                    >
                                        {infoMediaJogo.media}
                                    </span>
                                ) : (
                                    <span
                                        className="notaMetrica my-2"
                                        style={{ backgroundColor: retornaCorDaNota(0.0) }}
                                    >
                                        {0.0}
                                    </span>
                                )}

                                <span style={{ fontSize: 12 }}>Nota da Comunidade</span>
                                {infoMediaJogo?.media ? (
                                    <span
                                        style={{ fontSize: 12 }}
                                    >{`Baseada em ${infoMediaJogo.quantidaAvaliacoes} avaliações`}</span>
                                ) : (
                                    <span style={{ fontSize: 12 }}>
                                        Esse jogo não possui avaliações
                                    </span>
                                )}
                            </div>

                            <div className="containerInternoSecaoNotaMediaEAdicionarNota">
                                <RiAddCircleLine className="my-2" size={"2.5em"} />
                                <Link to={`/avaliar/${jogo.id}`}>
                                    <Button variant="info" style={{ color: "white" }}>
                                        Adicionar Nota
                                    </Button>
                                </Link>
                            </div>
                        </section>
                       
                        <div className="asides">
                            {/* FICHA DO JOGO */}
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
                                        {jogo.Plataformas?.map((item) => (
                                            <Badge key={item.id} pill bg="secondary" className="ms-1">
                                                {item.descricao}
                                            </Badge>
                                        ))}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    <div>Modos de Jogo</div>
                                    <span>
                                        {jogo.Generos?.map((item) => (
                                            <Badge key={item.id} pill bg="secondary" className="ms-1">
                                                {item.descricao}
                                            </Badge>
                                        ))}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li">
                                    <div>Desenvolvedora</div>
                                    <span>
                                        <Badge pill bg="secondary">
                                            {jogo.desenvolvedora}
                                        </Badge>
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>
                        </aside>
                            {/* NOTAS POR PLATAFORMA */}
                        {
                            mediaDoJogoPorPlataforma &&
                            <aside className="my-4 tabela">
                            <h3>Notas por plataforma</h3>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                    <th>Plataforma</th>
                                    <th>Nota</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        mediaDoJogoPorPlataforma.map(item => (
                                        <tr>
                                            <td>{item.Plataforma.descricao}</td>
                                            <td>
                                            <div
                                        className="notaMetrica"
                                        style={{
                                            backgroundColor: retornaCorDaNota(
                                               calcularMedia(item.audio, item.cores, item.feedback, item.interface) ?? 0.0
                                            ),
                                        }}
                                    >
                                        <span>{calcularMedia(item.audio, item.cores, item.feedback, item.interface) ?? 0.0}</span>
                                    </div>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                  
                                </tbody>
                            </Table>
                        </aside>
                        }
                        </div>
                    </main>
                </>
            ) : (
                <Loading />
            )}

            <MsgErro
                mensagem={msgErrText}
                show={msgErr}
                onHide={() => setMsgErro(false)}
            />
            <Footer/>
        </Container>
       </>
    );
};

export default Detalhes;
