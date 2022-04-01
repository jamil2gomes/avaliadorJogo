import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
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
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Loading from "../../components/Loading";
import Modal from 'react-bootstrap/Modal';
import MsgErro from "../../components/Modal/MsgErro";
import MsgQuestion from '../../components/Modal/MsgQuestion';
import MsgSuccess from '../../components/Modal/MsgSuccess';
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Dialog, { Links } from '../../components/Popover';
import SliderEstilizado from "../../components/Slider";

//UTILITARIOS
import { retornaCorDaNota } from "../../util";

//IMAGENS, ESTILOS
import { RiAddCircleLine, RiInformationLine } from "react-icons/ri";
import logo from "../../assets/jogogenerico.png";
import "./detalhes.css";

//INTERFACES, SERVICOS, HOOKS
import { DetalhesJogo, MediaGeralJogo, MediasPorPlataforma, OptionProp } from "../../interfaces";
import {
    deletarAvaliacao,
    editarAvaliacao,
    pegarAvaliacaoDoJogoDoUsuario,
    pegarDetalhesDoJogoPelo,
    pegarMediaDeAvaliacaoDoJogo,
    pegarMediaDeAvaliacaoDoJogoPorPlataformas,
} from "../../services/telaDetalhesJogo";
import { pegarPlataformasDadoJogo, realizaAvaliacao, salvarComentario } from "../../services/avaliacao";
import useSliderAvaliacao from "../../hooks/useSlider";
import Comentario from "../../components/Comentario";


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

type NotasDoUsuario = {
    id: number;
    audio: number;
    feedback: number;
    cores: number;
    interface: number;
    media: string;
    'Usuario.Comentarios.id':number;
    'Usuario.Comentarios.descricao':string;
}
type ConteudoModal = { titulo: string, conteudo: string, link: Links }

const Detalhes = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [msgErr, setMsgErro] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [comentario, setComentario] = useState("");
    const [plataforma, setPlataforma] = useState(0);
    const [plataformas, setPlataformas] = useState<OptionProp[]>([]);
    const [msgInfoDeletar, setMsgInfoDeletar] = useState(false);
    const [modalAvaliar, setModalAvaliar] = useState({ tipo: '', show: false });
    const [msgErrText, setMsgErroText] = useState("");
    const [msgSuccess, setMsgSuccess] = useState(false);
    const [conteudoModal, setConteudoModal] = useState<ConteudoModal>({} as ConteudoModal);
    const [jogo, setJogo] = useState<DetalhesJogo>({} as DetalhesJogo);
    const [infoMediaJogo, setInfoMediaJogo] = useState<MediaGeralJogo>();
    const [notasDaPlataforma, setNotasDaPlataforma] = useState(data.default);
    const [notasDoUsuario, setNotasDoUsuario] = useState<NotasDoUsuario | null>(null);
    const {
        valorAudio,
        valorFeedback,
        valorCores,
        valorInterface,
        trocarCorAudio,
        trocarCorInterface,
        trocarCorFeedback,
        trocarCorCores,
        onChangeAudio,
        onChangeInterface,
        onChangeFeedback,
        onChangeCores,
        setValorAudio,
        setValorFeedback,
        setvalorCores,
        setValorInterface
    } = useSliderAvaliacao();

    const [mediaDoJogoPorPlataforma, setMediaDoJogoPorPlataforma] = useState<MediasPorPlataforma[]>([]);
    const { usuario } = useContext(AuthContext);
    const { id } = useParams();

    function valuetext(value: number) {
        return `${value}`;
    }

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    useEffect(() => {
        pegarDetalhesDoJogo();
    }, [id, usuario]);

    function calcularMedia(...valores: number[]) {

        const notas = valores.reduce((atual, total) => total + atual, 0);
        const media = notas / valores.length;
        return media;
    }

    const realizarAvaliacao = async () => {

        setLoadingModal(true);
        try {

            if (plataforma === 0) {
                setLoadingModal(false);
                throw new Error('Você precisa selecionar a plataforma em que jogou');
            }

            let body = {
                audio: valorAudio,
                feedback: valorFeedback,
                cores: valorCores,
                interface: valorInterface,
                usuario_id: usuario!.id,
                plataforma_id: plataforma
            }

            const response = await realizaAvaliacao(id, body, usuario!.token);

            if (response.status === 201 && comentario.trim().length > 0) {
                let bodyComentario = {
                    descricao: comentario,
                    jogo_id: id,
                    usuario_id: usuario!.id
                }

                await salvarComentario(id, bodyComentario, usuario!.token);
            }
            await pegarDetalhesDoJogo();
            setMsgSuccess(true);
        } catch (error: any) {
            setMsgErroText(`Erro: ${error.message}`);
            setMsgErro(true);
        } finally {
            setLoadingModal(false);
        }
    }

    const deletaAvaliacao = async () => {
        setLoading(true);
        try {
            await deletarAvaliacao(id, notasDoUsuario!.id, usuario!.token);
            setNotasDoUsuario(null);
            setMsgInfoDeletar(false);

            await pegarDetalhesDoJogo();
        } catch (error: any) {
            setMsgErroText(`Ocorreu um erro ao deletar avaliação. Erro: ${error.message}`);
            setMsgErro(true);
        } finally {
            setLoading(false);
        }
    }

    const editaAvaliacao = async () => {
        setLoadingModal(true);

        try {
            if (plataforma === 0) {
                setLoadingModal(false);
                throw new Error('Você precisa selecionar a plataforma em que jogou');
            }

            let body = {
                audio: valorAudio,
                feedback: valorFeedback,
                cores: valorCores,
                interface: valorInterface,
                usuario_id: usuario!.id,
                plataforma_id: plataforma
            }

            const response = await editarAvaliacao(id, notasDoUsuario!.id, body, usuario!.token);

            if (response.status === 204 && comentario.trim().length > 0  && comentario !== notasDoUsuario?.["Usuario.Comentarios.descricao"]) {
                let bodyComentario = {
                    descricao: comentario,
                    jogo_id: id,
                    usuario_id: usuario!.id
                }

                await salvarComentario(id, bodyComentario, usuario!.token);
            }

            setMsgSuccess(true);
            await pegarDetalhesDoJogo();
        } catch (error: any) {
            setMsgErroText(`Ocorreu um erro ao atualizar avaliação. ${error.message}`);
            setMsgErro(true);
        } finally {
            setLoadingModal(false);
        }
    }


    const pegarNotasDoUsuarioSobreOJogo = async () => {

        setLoading(true);
        try {
            const response = await pegarAvaliacaoDoJogoDoUsuario(id, usuario!.id);
            if (!response.data.mensagem) {
                setNotasDoUsuario(response.data);
            }

        } catch (error: any) {
            setMsgErroText(`Ocorreu um erro ao carregar informações da nota do usuário sobre o jogo. Erro: ${error.message}`);
            setMsgErro(true);
        } finally {
            setLoading(false);
        }

    }

    const preencherSelect = useCallback(async () => {
        try {
            const response = await pegarPlataformasDadoJogo(id);

            let plataFormasPegasNaRequisicao: OptionProp[] = [];
            response.data.Plataformas.forEach((item: any) => {
                let platform = { value: 0, label: "" }
                platform.value = item.id;
                platform.label = item.descricao;
                plataFormasPegasNaRequisicao.push(platform);
            })

            setPlataformas(plataFormasPegasNaRequisicao);

        } catch (error: any) {
            setMsgErroText(`Ocorreu um erro ao preencher plataformas do jogo. Erro: ${error.message}`);
            setMsgErro(true);
        }
    }, [id]);

    const aoAbrirModalEditarAvaliacao = () => {
        setPlataforma(0);
        preencherSelect();
        setComentario(notasDoUsuario?.["Usuario.Comentarios.descricao"] ?? '');
        setvalorCores(notasDoUsuario!.cores);
        setValorAudio(notasDoUsuario!.audio);
        setValorFeedback(notasDoUsuario!.feedback);
        setValorInterface(notasDoUsuario!.interface);

    }

    const aoAbrirModalCriarAvaliacao = () => {
        setPlataforma(0);
        preencherSelect();
        setvalorCores(5);
        setValorAudio(5);
        setValorFeedback(5);
        setValorInterface(5);
    }

    const pegarDetalhesDoJogo = async () => {
        setLoading(true);
        try {
            const detalhesJogo = await pegarDetalhesDoJogoPelo(id);
            const mediaJogo = await pegarMediaDeAvaliacaoDoJogo(id);
            const mediaPorPlataforma = await pegarMediaDeAvaliacaoDoJogoPorPlataformas(id);
            setMediaDoJogoPorPlataforma(mediaPorPlataforma.data.medias);
            setJogo(detalhesJogo.data);
            setInfoMediaJogo(mediaJogo.data);

            let dadosProGrafico = [];
            for (let item in mediaJogo.data.medias) {
                let dadoProGrafico = { label: '', value: 0.0 };
                dadoProGrafico.label = item;
                dadoProGrafico.value = mediaJogo.data.medias[item];
                dadosProGrafico.push(dadoProGrafico);
            }
            setNotasDaPlataforma(dadosProGrafico);

            if (usuario) {
                await pegarNotasDoUsuarioSobreOJogo()
            }

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
            <NavBar exibirPesquisa={false} />
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
                                <Accordion style={{ borderWidth: 1 }}>
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
                                infoMediaJogo?.medias && Object.keys(infoMediaJogo.medias).length !== 0 &&
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
                                <div className='listagemMetricasComNotasContainer'>
                                    <h3>Notas do Jogo</h3>
                                    <ListGroup as="ul" variant="flush">
                                        <ListGroup.Item
                                            as="li"
                                            action
                                            className="d-flex justify-content-between align-items-center"
                                        >
                                            <div>
                                                <p className="labelNota">Áudio</p>
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
                                                <p className="labelNota">Feedback</p>
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
                                                <p className="labelNota">Cores</p>
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
                                                <p className="labelNota">Interface</p>
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
                                </div>
                                {
                                    usuario && notasDoUsuario &&
                                    <div className='listagemMetricasComNotasContainer'>
                                        <h3>Sua Nota</h3>
                                        <ListGroup as="ul" variant="flush">
                                            <ListGroup.Item
                                                as="li"
                                                action
                                                className="d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <p className="labelNota">Áudio</p>
                                                </div>
                                                <div
                                                    className="notaMetrica"
                                                    style={{ backgroundColor: retornaCorDaNota(notasDoUsuario.audio ?? 0.0) }}
                                                >
                                                    <span>{notasDoUsuario.audio ?? 0.0}</span>
                                                </div>
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                as="li"
                                                action
                                                className="d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <p className="labelNota">Feedback</p>
                                                </div>
                                                <div
                                                    className="notaMetrica"
                                                    style={{
                                                        backgroundColor: retornaCorDaNota(notasDoUsuario.feedback ?? 0.0),
                                                    }}
                                                >
                                                    <span>{notasDoUsuario.feedback ?? 0.0}</span>
                                                </div>
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                as="li"
                                                action
                                                className="d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <p className="labelNota">Cores</p>
                                                </div>
                                                <div
                                                    className="notaMetrica"
                                                    style={{
                                                        backgroundColor: retornaCorDaNota(notasDoUsuario.cores ?? 0.0),
                                                    }}
                                                >
                                                    <span>{notasDoUsuario.cores ?? 0.0}</span>
                                                </div>
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                as="li"
                                                action
                                                className="d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <p className="labelNota">Interface</p>
                                                </div>
                                                <div
                                                    className="notaMetrica"
                                                    style={{
                                                        backgroundColor: retornaCorDaNota(
                                                            notasDoUsuario.interface ?? 0.0
                                                        ),
                                                    }}
                                                >
                                                    <span>{notasDoUsuario.interface ?? 0.0}</span>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                }
                            </section>
                            {/* MEDIA DO JOGO E DA AVALIACAO DO USUARIO */}
                            <section className="my-3 secaoNotaMediaEAdicionarNota">
                                

                                {/* ADICIONAR/EDITAR/EXCLUIR NOTA*/}
                                {
                                    usuario &&
                                    <div style={{ padding:10,boxShadow: '5px 5px 5px 5px rgba(56, 3, 66, 0.322)'}}>
                                    {
                                        !notasDoUsuario ?
                                                  
                                             <>
                                             
                                                 <Button variant="success" style={{fontSize:'1.5rem'}} onClick={() => {
                                                     setModalAvaliar({ tipo: 'salvar', show: true });
                                                     aoAbrirModalCriarAvaliacao();
                                                 }}>
                                                     Adicionar Nota
                                                 </Button>
                                             </>
                                                   
                                                

                                             :
                                            <div >
                                                <Button  style={{fontSize:'1.5rem'}} variant="info" className="me-2" onClick={() => {
                                                    setModalAvaliar({ tipo: 'editar', show: true });
                                                    aoAbrirModalEditarAvaliacao();
                                                }}>
                                                    Editar Nota
                                                </Button>
                                                <Button style={{fontSize:'1.5rem'}} variant="danger" onClick={() => setMsgInfoDeletar(true)}>
                                                    Excluir Nota
                                                </Button>
                                            </div>
                                    }
                                </div>
                                }
                            </section>


                           <div className="containerAsidesEComentarios">
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
                                            <span>{jogo.data_lancamento ?? '-'}</span>
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
                                <aside className="my-4 fichaTecnica">
                                <h3>Média</h3>
                                <ListGroup variant="flush" as="ol">
                                        <ListGroup.Item as="li">
                                            <div>Média Geral</div>
                                            <span className="notaMetrica" style={{ backgroundColor: retornaCorDaNota(infoMediaJogo?.media ?? 0.0) }}>{infoMediaJogo?.media ?? 0.0}</span>
                                        </ListGroup.Item>
                                        {notasDoUsuario?.media &&
                                            <ListGroup.Item as="li" >
                                                <div>Sua Nota</div>
                                                <span className="notaMetrica" style={{ backgroundColor: retornaCorDaNota(infoMediaJogo?.media ?? 0.0) }}>{notasDoUsuario?.media ?? 0.0}</span>
                                            </ListGroup.Item>
                                        }
                                        </ListGroup>

                                </aside>
                              
                                {/* NOTAS POR PLATAFORMA */}
                                {
                                    mediaDoJogoPorPlataforma && mediaDoJogoPorPlataforma.length > 0 &&
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
                                                                            calcularMedia(Number(item.audio), Number(item.cores), Number(item.feedback), Number(item.interface)) ?? 0.0
                                                                        ),
                                                                    }}
                                                                >
                                                                    <span>{calcularMedia(Number(item.audio), Number(item.cores), Number(item.feedback), Number(item.interface)).toFixed(1) ?? 0.0}</span>
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

                                <div className="containerComentarios">
                                    <Comentario
                                        autor="Jamil"
                                        data={"20/03/2022"}
                                        mensagem="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                                    <Comentario
                                        autor="Jamil"
                                        data={"20/03/2022"}
                                        mensagem="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                                </div>
                               
                           </div>         
                               
                        </main>
                    </>
                ) : (
                    <Loading />
                )}
                 
               
                 {/* MODAL DE SALVAR E ATUALIZAR AVALIAÇÃO */}
                <Modal show={modalAvaliar.show} fullscreen onHide={() => setModalAvaliar({ tipo: '', show: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalAvaliar.tipo === 'salvar' ? 'Registrar avaliação' : 'Editar avaliação'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <section className="containerModalAvaliacao my-4 mx-auto">
                            <section className="containerCabecalho">
                                <div className="cabecalho">
                                    <Image rounded src={jogo.imagem_url ?? logo} width={90} height={90} alt={`Imagem do jogo ${jogo.nome} a ser avaliado`} />
                                    <span
                                        className="notaMetrica notaMediaAvaliacao ms-3"
                                        style={{ backgroundColor: retornaCorDaNota(calcularMedia(valorAudio, valorFeedback, valorCores, valorInterface,)) }}>
                                        {calcularMedia(valorAudio, valorFeedback, valorCores, valorInterface,)}
                                    </span>
                                </div>
                                <span className="containerInstrucaoAvaliacao my-3">Deslize os botões abaixo para avaliar o jogo</span>
                            </section>
                            {
                                !loadingModal ?
                                    <section className="avaliacao">
                                        <div>
                                            <div className="avaliacaoSection">
                                                <div style={{ width: "90%" }}>

                                                    <label id="audio">
                                                        <span
                                                            id="audioInfo"
                                                            aria-expanded="false"
                                                            role="button"
                                                            className="me-1"
                                                            onClick={() => {
                                                                setConteudoModal({
                                                                    titulo: "Áudio",
                                                                    conteudo: `O jogo possui sons perturbadores e explosivos, como sirenes e fogos de artifício?\nIsso deve ser evitado, devido à sensibilidade da criança com autismo para determinados sons.\n`,
                                                                    link: Links.AUDIO
                                                                });
                                                                handleShow();
                                                            }}
                                                        >
                                                            <RiInformationLine />
                                                        </span>
                                                        Áudio
                                                    </label>

                                                    <SliderEstilizado
                                                        aria-labelledby="audio"
                                                        trocarCor={trocarCorAudio}
                                                        onChange={onChangeAudio}
                                                        getAriaValueText={valuetext}
                                                        valueLabelDisplay="auto"
                                                        value={valorAudio}
                                                        step={1}
                                                        marks
                                                        min={0}
                                                        max={10}
                                                    />
                                                </div>
                                                <span
                                                    className="notaMetrica notaMediaAvaliacao ms-3"
                                                    style={{ backgroundColor: retornaCorDaNota(valorAudio), height: 50, width: 50 }}
                                                >{valorAudio}
                                                </span>
                                            </div>
                                            <div className="avaliacaoSection">
                                                <div style={{ width: "90%" }}>
                                                    <label id="feedback">
                                                        <span
                                                            id="feedbackInfo"
                                                            aria-expanded="false"
                                                            role="button"
                                                            className="me-1"
                                                            onClick={() => {
                                                                setConteudoModal({
                                                                    titulo: "Feedback",
                                                                    conteudo: `O jogo fornece mensagens claras para indicar que aquela ação não deve ser realizada e como a pessoa deve interagir com aquele elemento.\n`,
                                                                    link: Links.FEEDBACK
                                                                });
                                                                handleShow();
                                                            }}
                                                        >
                                                            <RiInformationLine />
                                                        </span>
                                                        Feedback
                                                    </label>
                                                    <SliderEstilizado
                                                        aria-labelledby="feedback"
                                                        trocarCor={trocarCorFeedback}
                                                        onChange={onChangeFeedback}
                                                        getAriaValueText={valuetext}
                                                        valueLabelDisplay="auto"
                                                        value={valorFeedback}
                                                        step={1}
                                                        marks
                                                        min={0}
                                                        max={10}
                                                    />
                                                </div>
                                                <span
                                                    className="notaMetrica notaMediaAvaliacao ms-3"
                                                    style={{ backgroundColor: retornaCorDaNota(valorFeedback), height: 50, width: 50 }}
                                                >{valorFeedback}
                                                </span>
                                            </div>
                                            <div className="avaliacaoSection">
                                                <div style={{ width: "90%" }}>
                                                    <label id="cores">
                                                        <span
                                                            id="coresInfo"
                                                            aria-expanded="false"
                                                            role="button"
                                                            className="me-1"
                                                            onClick={() => {
                                                                setConteudoModal({
                                                                    titulo: "Cores",
                                                                    conteudo: `O contraste entre as cores de fundo e objetos de primeiro plano deve ser adequado para distinguir os itens e diferenciar conteúdos ou relacionar informações similares.\n`,
                                                                    link: Links.CORES
                                                                });
                                                                handleShow();
                                                            }}
                                                        >
                                                            <RiInformationLine />
                                                        </span>
                                                        Cores
                                                    </label>
                                                    <SliderEstilizado
                                                        aria-labelledby="cores"
                                                        trocarCor={trocarCorCores}
                                                        onChange={onChangeCores}
                                                        getAriaValueText={valuetext}
                                                        valueLabelDisplay="auto"
                                                        value={valorCores}
                                                        step={1}
                                                        marks
                                                        min={0}
                                                        max={10}
                                                    />
                                                </div>
                                                <span
                                                    className="notaMetrica notaMediaAvaliacao ms-3"
                                                    style={{ backgroundColor: retornaCorDaNota(valorCores), height: 50, width: 50 }}
                                                >{valorCores}
                                                </span>
                                            </div>
                                            <div className="avaliacaoSection">
                                                <div style={{ width: "90%" }}>
                                                    <label id="interface">
                                                        <span
                                                            id="interfaceInfo"
                                                            aria-expanded="false"
                                                            role="button"
                                                            className="me-1"
                                                            onClick={() => {
                                                                setConteudoModal({
                                                                    titulo: "Interface",
                                                                    conteudo: `Interfaces simples, com poucos elementos e que contenha somente as funcionalidades e conteúdos necessários para a tarefa atua.\n`,
                                                                    link: Links.INTERFACE
                                                                });
                                                                handleShow();
                                                            }}
                                                        >
                                                            <RiInformationLine />
                                                        </span>
                                                        Interface
                                                    </label>
                                                    <SliderEstilizado
                                                        aria-labelledby="cores"
                                                        trocarCor={trocarCorInterface}
                                                        onChange={onChangeInterface}
                                                        getAriaValueText={valuetext}
                                                        valueLabelDisplay="auto"
                                                        value={valorInterface}
                                                        step={1}
                                                        marks
                                                        min={0}
                                                        max={10}
                                                    />
                                                </div>
                                                <span
                                                    className="notaMetrica notaMediaAvaliacao ms-3"
                                                    style={{ backgroundColor: retornaCorDaNota(valorInterface), height: 50, width: 50 }}
                                                >{valorInterface}
                                                </span>
                                            </div>
                                            <Form.Select
                                                size="lg"
                                                aria-label="Select de plataformas onde jogou"
                                                className="mb-4"
                                                onChange={(e) => {
                                                    console.log(e.target.value)
                                                    setPlataforma(Number(e.target.value))
                                                }}>
                                                <option key={0} value={0}>Em qual plataforma você jogou?</option>
                                                {
                                                    plataformas.map(item => (
                                                        <option key={item.value} value={item.value}>{item.label}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                            <Form.Group className="mb-3" controlId="descricao">
                                                <Form.Label>Comentário</Form.Label>
                                                <Form.Control as="textarea" rows={4} style={{ resize: 'none' }} value={comentario} onChange={(e) => { setComentario(e.target.value) }} />
                                            </Form.Group>

                                            <Button
                                                className="my-4"
                                                variant="primary"
                                                size="lg"
                                                style={{ width: "100%" }}
                                                onClick={() => {
                                                    if (modalAvaliar.tipo === 'salvar') {
                                                        realizarAvaliacao();
                                                    } else {
                                                        editaAvaliacao();
                                                    }
                                                }}
                                            >
                                                Concluir
                                            </Button>
                                        </div>
                                    </section> : <Loading />
                            }
                        </section>
                    </Modal.Body>
                </Modal>
                
                <Dialog
                    id={conteudoModal.link}
                    titulo={conteudoModal.titulo}
                    conteudo={conteudoModal.conteudo}
                    show={modalShow}
                    onHide={handleClose}
                />
                <MsgSuccess
                    show={msgSuccess}
                    mensagem="Avaliação registrada com sucesso!"
                    onHide={() => { setMsgSuccess(false); setModalAvaliar({ tipo: '', show: false }); }} />

                <MsgQuestion
                    show={msgInfoDeletar}
                    titulo={"Excluir avaliação?"}
                    mensagem={"Você está prestes a excluir sua avaliação desse jogo. Esse processo não pode ser desfeito. Deseja continuar?"}
                    confirmar={() => deletaAvaliacao()}
                    onHide={() => setMsgInfoDeletar(false)}
                />

                <MsgErro
                    mensagem={msgErrText}
                    show={msgErr}
                    onHide={() => setMsgErro(false)}
                />
                <Footer />
            </Container>
        </>
    );
};

export default Detalhes;
