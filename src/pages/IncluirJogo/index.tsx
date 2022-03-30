import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Select from "react-select";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import "./incluirJogo.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { pegarGeneros, pegarPlataformas } from "../../services/incluirJogo";
import MsgErro from "../../components/Modal/MsgErro";
import Loading from "../../components/Loading";
import { GeneroPlataformaRequest, OptionProp } from "../../interfaces";

const IncluirJogo = () => {

    const [plataformas, setPlataformas] = useState<OptionProp[]>([]);
    const [generos, setGeneros] = useState<OptionProp[]>([]);
    const [dataGeneros, setDataGeneros] = useState<OptionProp[]>([]);
    const [dataPlataformas, setDataPlataformas] = useState<OptionProp[]>([]);
    const [msgErr, setMsgErro] = useState(false);
    const [msgErrText, setMsgErroText] = useState('');
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
 

    useEffect(() => { 
        pegaTodosGeneros();
        pegaTodasPlataformas();
    }, []);

    function isValidURL(url:string) {
        var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }



    const pegaTodosGeneros = async() =>{
        setLoading(true);
        try {
           const response = await pegarGeneros();

           const generosBuscados = response.data as GeneroPlataformaRequest[];
           let generos:OptionProp[] = [];
           generosBuscados.forEach((item) => {
               let genero:OptionProp = {value:0, label:''};
               
               genero.value = item.id;
               genero.label = item.descricao;
               generos.push(genero);
            });

            setDataGeneros(generos);
        } catch (error:any) {
            setMsgErroText(`Ocorreu um erro ao carregar os gêneros. Erro: ${error.message}`);
            setMsgErro(true);
        }finally{
            setLoading(false);
        }
    }

    const pegaTodasPlataformas = async() =>{
        setLoading(true);
        try {
           const response = await pegarPlataformas();

           const plataformasBuscados = response.data as GeneroPlataformaRequest[];
           let plataforms:OptionProp[] = [];
           plataformasBuscados.forEach((item) => {
               let plataforma:OptionProp = {value:0, label:''};
               
               plataforma.value = item.id;
               plataforma.label = item.descricao;
               plataforms.push(plataforma);
            });

            setDataPlataformas(plataforms);
        } catch (error:any) {
            setMsgErroText(`Ocorreu um erro ao carregar as plataformas. Erro: ${error.message}`);
            setMsgErro(true);
        }finally{
            setLoading(false);
        }
    }


    return (
        <>
            <style type="text/css">
            {`
                .btn-indigo {
                background-color: indigo;
                color: white;
                }

                .btn-indigo:hover {
                color: white;
                background-color: #8000DE;
                }
           `}
            </style>
            <NavBar exibirPesquisa={false}/>
            <Container className="container" style={{backgroundColor:"#E5E5E5", backgroundImage:"none"}}>
                <h2 className="my-3">Incluir jogo</h2>
                {
                    !loading ? 
                    <Form className="" style={{ width: "95%" }}>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control autoFocus type="text" placeholder="Insira o nome do jogo" size="lg" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Sinopse</Form.Label>
                        <Form.Control as="textarea" rows={4} size="lg" style={{ resize: 'none' }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dataLancamento">
                        <Form.Label>Data Lançamento</Form.Label>
                        <Form.Control type="date" size="lg" placeholder="Insira o nome do jogo" />
                    </Form.Group>
                    <div className="mb-3" >
                        <label className="mb-2" htmlFor="plataformas">Plataformas</label>
                        <Select
                            placeholder=""
                            id="plataformas"
                            onChange={(_, action) => {
                                if (action.removedValue) {
                                    let index = plataformas.findIndex(item => item === action.removedValue)
                                    plataformas!.splice(index, 1);
                                    setPlataformas([...plataformas]);
                                } else if (action.removedValues) {
                                    setPlataformas([]);
                                } else {
                                    setPlataformas([...plataformas, action.option!])

                                }
                            }}
                            isMulti
                            name="colors"
                            options={dataPlataformas}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="mb-3" >
                        <label className="mb-2" htmlFor="generos">Gêneros</label>
                        <Select
                            placeholder=""
                            id="generos"
                            onChange={(_, action) => {
                                if (action.removedValue) {
                                    let index = generos.findIndex(item => item === action.removedValue)
                                    generos!.splice(index, 1);
                                    setGeneros([...generos]);
                                } else if (action.removedValues) {
                                    setGeneros([]);
                                } else {
                                    setGeneros([...generos, action.option!])

                                }
                            }}
                            isMulti
                            name="colors"
                            options={dataGeneros}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    <Form.Group className="mb-3" controlId="desenvolvedor">
                        <Form.Label>Desenvolvedora</Form.Label>
                        <Form.Control type="text" size="lg" placeholder="Insira a desenvolvedora" />
                    </Form.Group>

                    <Form.Group controlId="capaJogo" className="mb-3">
                        <Form.Label>Capa do jogo</Form.Label>
                        <Form.Control value={url} onChange={(e)=>setUrl(e.target.value)} size="lg" type="text" placeholder="Insira a url da imagem da capa do jogo" />
                    </Form.Group>

                    <Button variant="indigo" onClick={()=>{
                        console.log('url:', isValidURL(url));
                    }} className="mb-3">Concluir</Button>
                </Form>:
                <Loading />
                }
               
                <MsgErro
                mensagem={msgErrText}
                show={msgErr}
                onHide={()=>setMsgErro(false)}
                />
            </Container>
            <Footer/>
        </>
    )
}

export default IncluirJogo;