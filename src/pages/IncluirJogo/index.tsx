import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Select from "react-select";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import "./incluirJogo.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { criarJogo, pegarGeneros, pegarPlataformas } from "../../services/incluirJogo";
import MsgErro from "../../components/Modal/MsgErro";
import Loading from "../../components/Loading";
import { GeneroPlataformaRequest, OptionProp } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import MsgSuccess from "../../components/Modal/MsgSuccess";
import useAuth from "../../hooks/useAuth";

const IncluirJogo = () => {

    const [plataformas, setPlataformas] = useState<OptionProp[]>([]);
    const [generos, setGeneros] = useState<OptionProp[]>([]);
    const [dataGeneros, setDataGeneros] = useState<OptionProp[]>([]);
    const [dataPlataformas, setDataPlataformas] = useState<OptionProp[]>([]);
    const [msgErr, setMsgErro] = useState(false);
    const [msgErrText, setMsgErroText] = useState('');
    const [msgSuccess, setMsgSuccess] = useState(false);
    const [msgSuccessText, setMsgSuccessText] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [nomeJogo, setNomeJogo] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [desenvolvedora, setDesenvolvedora] = useState('');
    const [dataLancamento, setDataLancamento] = useState('');
    const [urlJogo, setUrlJogo] = useState('');
    const [validatedCadastro, setValidatedCadastro] = useState(false);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const {usuario} = useAuth();
 

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

    const cadastrarJogo = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            
        }
        setValidatedCadastro(true);

       if(urlImagem && !isValidURL(urlImagem)){
           setMsgErroText('A url da imagem do jogo está inválida')
           setMsgErro(true);
           return;
       }

       if(plataformas.length === 0){
        setMsgErroText('Selecione pelo menos uma plataforma onde esse jogo pode ser encontrado.')
        setMsgErro(true);
        return;
       }

       if(sinopse.length === 0){
        setMsgErroText('Por favor, campo sinopse é obrigatório!')
        setMsgErro(true);
        return;
       }

       if(generos.length === 0){
        setMsgErroText('Selecione pelo menos um gênero.')
        setMsgErro(true);
        return;
       }

       if(!isValidURL(urlJogo)){
        setMsgErroText('A url do jogo está está inválida')
        setMsgErro(true);
        return;
       }

       let valoresPlataformas:number[] = [];
       plataformas.forEach(element => {
           valoresPlataformas.push(element.value)
       });

       let valoresGeneros:number[] = [];
       generos.forEach(element => {
        valoresGeneros.push(element.value)
       });


       const body = {
        nome: nomeJogo,
        sinopse:sinopse,
        data_lancamento: dataLancamento === "" ? null : dataLancamento,
        desenvolvedora:desenvolvedora,
        imagem_url: urlImagem,
        jogo_url: urlJogo,
        usuario_id: usuario!.id,
        plataformas:valoresPlataformas,
        generos:valoresGeneros
       }

       try {
           const response = await criarJogo(body,usuario!.token);
           if(response.status === 201){
               setMsgSuccess(true);
               setMsgSuccessText("Jogos cadastrado com sucesso");
               valoresGeneros=[];
               valoresPlataformas = [];
           }
       } catch (error) {
        console.log(error)
        setMsgErroText('Ocorreu um erro ao cadastrar o jogo. Tente novamente mais tarde');
        setMsgErro(true);
        valoresGeneros=[];
        valoresPlataformas = [];
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
                <span className="my-3" style={{fontSize:12}}>* Campos obrigatórios</span>
                {
                    !loading ? 
                    <Form 
                    noValidate 
                    validated={validatedCadastro}  
                    style={{ width: "95%" }} 
                    onSubmit={cadastrarJogo}
                    >
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome*</Form.Label>
                        <Form.Control autoFocus type="text" placeholder="Insira o nome do jogo" size="lg" onChange={(e)=>setNomeJogo(e.target.value)} required />
                        <Form.Control.Feedback type="invalid">O nome do jogo é obrigatório</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Sinopse*</Form.Label>
                        <Form.Control as="textarea" rows={6} size="lg" style={{ resize: 'none' }} onChange={(e)=>setSinopse(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">A sinopse do jogo é obrigatória</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dataLancamento">
                        <Form.Label>Data Lançamento</Form.Label>
                        <Form.Control type="date" size="lg" placeholder="Insira o nome do jogo" onChange={(e)=>setDataLancamento(e.target.value)}/>
                    </Form.Group>
                    <div className="mb-3" >
                        <label className="mb-2" htmlFor="plataformas">Plataformas*</label>
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
                            name="plataformas"
                            options={dataPlataformas}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="mb-3" >
                        <label className="mb-2" htmlFor="generos">Gêneros*</label>
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
                            name="generos"
                            options={dataGeneros}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    <Form.Group className="mb-3" controlId="desenvolvedor">
                        <Form.Label>Desenvolvedora</Form.Label>
                        <Form.Control type="text" size="lg" placeholder="Insira a desenvolvedora" onChange={(e)=>setDesenvolvedora(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="capaJogo" className="mb-3">
                        <Form.Label>Capa do jogo</Form.Label>
                        <Form.Control value={urlImagem} onChange={(e)=>setUrlImagem(e.target.value)} size="lg" type="text" placeholder="Insira a url da imagem da capa do jogo" />
                        <Form.Text className="text-muted">Link da imagem do jogo.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="urlJogo" className="mb-3">
                        <Form.Label>Url do jogo*</Form.Label>
                        <Form.Control required value={urlJogo} onChange={(e)=>setUrlJogo(e.target.value)} size="lg" type="text" placeholder="Insira a url da imagem da capa do jogo" />
                        <Form.Text className="text-muted">Link de onde o jogo pode ser achado.</Form.Text>
                        <Form.Control.Feedback type="invalid">A url do jogo é obrigatório</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="indigo" className="mb-3" type="submit">Concluir</Button>
                </Form>:
                <Loading />
                }
               
                <MsgErro
                mensagem={msgErrText}
                show={msgErr}
                onHide={()=>setMsgErro(false)}
                />
                <MsgSuccess
                mensagem={msgSuccessText}
                show={msgSuccess}
                onHide={()=>{
                    setMsgSuccess(false);
                    navigate('/', {replace:true});
                }}
                />
            </Container>
            <Footer/>
        </>
    )
}

export default IncluirJogo;