import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";

//COMPONENTES
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SliderEstilizado from "./SlideEstilizado";
import Dialog,{Links} from '../../components/Popover';
import MsgErro from "../../components/Modal/MsgErro";
import MsgSuccess from '../../components/Modal/MsgSuccess';
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

//IMAGENS, ICONES, ESTILIZAÇÃO
import jogoImg from '../../assets/jogogenerico.png';
import { RiInformationLine } from 'react-icons/ri';
import "./avaliacao.css";

//UTILITARIOS, SERVIÇOS, INTERFACES
import { retornaCorDaNota } from "../../util";
import { pegarPlataformasDadoJogo, realizaAvaliacao, salvarComentario } from "../../services/avaliacao";
import { OptionProp } from "../../interfaces";
import useSliderAvaliacao from "../../hooks/useSlider";


type ConteudoModal = {titulo:string, conteudo:string, link:Links}

const Avaliacao: React.FC = () => {

    const [msgSuccess, setMsgSuccess] = useState(false);
    const [infoJogo, setInfoJogo] = useState({imagem:'', nome:''});
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msgErr, setMsgErro] = useState(false);
    const [msgErrText, setMsgErroText] = useState("");
    const [comentario, setComentario] = useState("");
    const [plataforma, setPlataforma] = useState(0);
    const [plataformas, setPlataformas] = useState<OptionProp[]>([]);
    const [conteudoModal, setConteudoModal] = useState<ConteudoModal>({} as ConteudoModal);
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
        onChangeCores
        } = useSliderAvaliacao();
    const {usuario} = useContext(AuthContext);
    let navigate = useNavigate();
    const {id} = useParams();

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    function valuetext(value: number) {
        return `${value}`;
    }

    useEffect(() => {     
        preencherSelect();
    }, []);

    const preencherSelect = async() =>{
        try {
            const response = await pegarPlataformasDadoJogo(id);

            setInfoJogo({nome:response.data.nome, imagem:response.data.imagem_url});

            let plataFormasPegasNaRequisicao:OptionProp[] = [];
            response.data.Plataformas.forEach((item:any)=>{
                let platform = {value:0, label:""}
                platform.value = item.id;
                platform.label = item.descricao;
                plataFormasPegasNaRequisicao.push(platform);
            })

            setPlataformas(plataFormasPegasNaRequisicao);

        } catch (error:any) {
            setMsgErroText(
                `Ocorreu um erro ao preencher plataformas do jogo. Erro: ${error.message}`
            );
            setMsgErro(true);
        }
    }

    const realizarAvaliacao = async() =>{
        setLoading(true);
        try {

            if(plataforma === 0){
                setLoading(false);
                throw new Error('Você precisa selecionar a plataforma em que jogou');
            }

            let body = {
                audio:valorAudio,
                feedback:valorFeedback,
                cores:valorCores,
                interface: valorInterface,
                usuario_id: usuario!.id,
                plataforma_id: plataforma
            }
           
            const response = await realizaAvaliacao(id, body, usuario!.token);

            if(response.status === 201 && comentario.trim().length > 0){

                let bodyComentario = {
                    descricao: comentario,
                    jogo_id: id, 
                    usuario_id: usuario!.id
                }

                await salvarComentario(id,bodyComentario, usuario!.token );
            }
            setMsgSuccess(true);
        } catch (error:any) {
            setMsgErroText(`Erro: ${error.message}`);
            setMsgErro(true);
        }finally{
            setLoading(false);
        }
    }

    function calcularMedia(){
        const valores = [valorAudio, valorCores, valorFeedback, valorInterface];

        const notas = valores.reduce((atual, total)=>total+atual,0);

        return notas/valores.length;
    }

    
    return (
        <>
        <NavBar exibirPesquisa={false}/>
    <Container fluid className="containerAvaliacao">
        <h2 className="my-2">Avaliação</h2>
        <main className="principal my-4 mx-auto">
            <section className="containerCabecalho">
            <div className="cabecalho">
                <Image rounded src={infoJogo.imagem??jogoImg} width={90} height={90} alt={`Imagem do jogo ${infoJogo.nome} a ser avaliado`} />
                <span className="notaMetrica notaMediaAvaliacao ms-3" style={{ backgroundColor: retornaCorDaNota(calcularMedia()) }}>{calcularMedia()}</span>
            </div>
            <span className="containerInstrucaoAvaliacao my-3">Deslize os botões abaixo para avaliar o jogo</span>
            </section>
            {/* AVALIAÇÃO */}
            {
                !loading ?
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
                                onClick={()=>{
                                    setConteudoModal({
                                        titulo:"Áudio", 
                                        conteudo:`O jogo possui sons perturbadores e explosivos, como sirenes e fogos de artifício?\nIsso deve ser evitado, devido à sensibilidade da criança com autismo para determinados sons.\n`,
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
                                    onClick={()=>{
                                        setConteudoModal({
                                            titulo:"Feedback", 
                                            conteudo:`O jogo fornece mensagens claras para indicar que aquela ação não deve ser realizada e como a pessoa deve interagir com aquele elemento.\n`,
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
                                    onClick={()=>{
                                        setConteudoModal({
                                            titulo:"Cores", 
                                            conteudo:`O contraste entre as cores de fundo e objetos de primeiro plano deve ser adequado para distinguir os itens e diferenciar conteúdos ou relacionar informações similares.\n`,
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
                                    onClick={()=>{
                                        setConteudoModal({
                                            titulo:"Interface", 
                                            conteudo:`Interfaces simples, com poucos elementos e que contenha somente as funcionalidades e conteúdos necessários para a tarefa atua.\n`,
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
                        onChange={(e)=>{
                            console.log(e.target.value)
                            setPlataforma(Number(e.target.value))
                        }}>
                            <option key={0} value={0}>Em qual plataforma você jogou?</option>
                            {
                                plataformas.map(item=>(
                                    <option key={item.value} value={item.value}>{item.label}</option>
                                ))
                            }
                        </Form.Select>
                        <Form.Group className="mb-3" controlId="descricao">
                            <Form.Label>Comentário</Form.Label>
                            <Form.Control as="textarea" rows={4} style={{ resize: 'none' }} onChange={(e)=>{setComentario(e.target.value)}}/>
                        </Form.Group>

                        <Button 
                        className="my-4" 
                        variant="primary" 
                        size="lg" 
                        style={{ width: "100%" }} 
                        onClick={()=>{realizarAvaliacao()}}
                        >
                            Concluir
                        </Button>
                    </div>
                </section>: <Loading/>
            }
            </main>
        </Container>
        <Footer/>

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
        onHide={()=>{
            setMsgSuccess(false);
            navigate(`/detalhes/${id}`);
        }}
        />
         <MsgErro
         mensagem={msgErrText}
         show={msgErr}
         onHide={() => setMsgErro(false)}
        />

    </>
    );
}


export default Avaliacao;