import React,{useState} from "react";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import SliderEstilizado from "./SlideEstilizado";
import jogoImg from '../../assets/controle-jogo.png';
import {RiInformationLine} from 'react-icons/ri';
import "./avaliacao.css";
//utilitarios
import { retornaCorDaNota } from "../../util";

const Avaliacao:React.FC = () => {

    const [valorAudio, setValorAudio] = useState(5);
    const [valorFeedback, setValorFeedback] = useState(5);
    const [valorNavegabilidade, setValorNavegabilidade] = useState(5);
    const [valorTipografia, setValorTipografia] = useState(5);

    function valuetext(value:number) {
        return `${value}`;
    }

    function trocarCorAudio(){
       return retornaCorDaNota(valorAudio);
    }

    function trocarCorFeedback(){
        return retornaCorDaNota(valorFeedback);
    }

    function trocarCorNavegabilidade(){
        return retornaCorDaNota(valorNavegabilidade);
    }
    function trocarCorTipografia(){
        return retornaCorDaNota(valorTipografia);
    }

    function onChangeAudio(event: Event, value: number | number[]) {
        setValorAudio(value as number);
    }
    function onChangeFeedback(event: Event, value: number | number[]) {
        setValorFeedback(value as number);
    }
    function onChangeNavegabilidade(event: Event, value: number | number[]) {
        setValorNavegabilidade(value as number);
    }
    function onChangeTipografia(event: Event, value: number | number[]) {
        setValorTipografia(value as number);
    }


    return (
    <>
    <Container fluid className="containerAvaliacao">
        <h2>Avaliacao</h2>
        <div className="cabecalho">
            <Image rounded src={jogoImg} width={78} height={95} alt="Imagem do Jogo a ser avaliado"/>
            <span className="notaMetrica notaMediaAvaliacao ms-3" style={{backgroundColor:retornaCorDaNota(6.2)}}>6.2</span>
        </div>
        <span className="containerInstrucaoAvaliacao my-3">Deslize os botões abaixo para avaliar o jogo</span>

        <section className="avaliacao">
            <div>
                <div className="avaliacaoSection">
                    <div style={{width:"90%"}}>
                        <label id="audio">
                            <span 
                            aria-label="Informação sobre diretriz Áudio" 
                            className="me-1" 
                            onClick={}
                            >
                                <RiInformationLine/>
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
                    style={{backgroundColor:retornaCorDaNota(valorAudio), height:50, width:50}}
                    >{valorAudio}
                    </span>
                </div>

                <div className="avaliacaoSection">
                    <div style={{width:"90%"}}>
                        <label id="feedback">
                            <span 
                            aria-label="Informação sobre diretriz Feedback" 
                            className="me-1" 
                            onClick={}
                            >
                                <RiInformationLine/>
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
                    style={{backgroundColor:retornaCorDaNota(valorAudio), height:50, width:50}}
                    >{valorAudio}
                    </span>
                </div>

                <div className="avaliacaoSection">
                    <div style={{width:"90%"}}>
                        <label id="navegabilidade">
                            <span 
                            aria-label="Informação sobre diretriz Navegabilidade" 
                            className="me-1" 
                            onClick={}
                            >
                                <RiInformationLine/>
                            </span>
                            Navegabilidade
                        </label>
                            <SliderEstilizado
                                aria-labelledby="navegabilidade"
                                trocarCor={trocarCorNavegabilidade}
                                onChange={onChangeNavegabilidade}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                value={valorNavegabilidade}
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                    </div>
                    <span 
                    className="notaMetrica notaMediaAvaliacao ms-3" 
                    style={{backgroundColor:retornaCorDaNota(valorAudio), height:50, width:50}}
                    >{valorAudio}
                    </span>
                </div>

                <div className="avaliacaoSection">
                    <div style={{width:"90%"}}>
                        <label id="tipografia">
                            <span 
                            aria-label="Informação sobre diretriz Tipografia" 
                            className="me-1" 
                            onClick={}
                            >
                                <RiInformationLine/>
                            </span>
                            Tipografia
                        </label>
                            <SliderEstilizado
                                aria-labelledby="tipografia"
                                trocarCor={trocarCorTipografia}
                                onChange={onChangeTipografia}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                value={valorTipografia}
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                    </div>
                    <span 
                    className="notaMetrica notaMediaAvaliacao ms-3" 
                    style={{backgroundColor:retornaCorDaNota(valorAudio), height:50, width:50}}
                    >{valorAudio}
                    </span>
                </div>
                <Form.Select aria-label="Select de plataformas onde jogou">
                    <option>Em qual plataforma você jogou?</option>
                    <option value="1">Android</option>
                    <option value="2">IOS</option>
                </Form.Select>          
            </div>
        </section>
    </Container>
    </>
    );
}


export default Avaliacao;