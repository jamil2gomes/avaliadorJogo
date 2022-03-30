import { useEffect, useState } from "react";
import { pegarTodosJogos } from "../../services/telaInicial";
import professor from '../../assets/professor.png';
//estilos
import "./home.css";

//componentes
import Container from "react-bootstrap/Container";
import Loading from "../../components/Loading";
import ItemJogo from "../../components/ItemJogo";
import Image    from 'react-bootstrap/Image';
import { JogoResumo } from "../../interfaces";
import CardGroup  from "react-bootstrap/CardGroup";
import MsgErro from "../../components/Modal/MsgErro";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";


const Home = () => {
    const [loading, setLoading] = useState(false);
    const [msgErr, setMsgErro] = useState(false);
    const [msgErrText, setMsgErroText] = useState('');
    const [busca, setBusca] = useState('');
    const [jogos, setJogos] = useState<JogoResumo[]>([]);
   
    const lowerBusca = busca.toLowerCase();
    const jogoFiltrado = jogos.filter((jogo)=>jogo.nome.toLowerCase().includes(lowerBusca));



    useEffect(()=>{pegarJogos()},[]);

    const pegarJogos = async() => {
        setLoading(true);
        try {
           const response = await pegarTodosJogos();
            setJogos(response.data);
        } catch (error) {
            setMsgErroText("Ocorreu um erro ao carregar os jogos. Tente novamente.");
            setMsgErro(true);
        }finally{
            setLoading(false);
        }
    }



    return (
        <>
            <NavBar
                value={busca}
                onChange={(event)=>setBusca(event.target.value)}
            />
                <Container fluid className="container containerHome">

                <div className="apresentacao">
                <div className="containerApresentacao">
                    <div className="apresentacaoTexto">
                        <h1 style={{fontSize:'4rem'}}>Bem vindo professor,</h1>
                        <p style={{fontSize:'1.5rem'}}>agora você tem uma espaço para avaliar jogos digitais
                        educacionais e recomendá-los para outros professores.</p>
                        </div>
                        <Image src={professor} width={400} height={400}/>
                </div>
                    
                </div>
                {
                    !loading ?
                        <section className="my-4 secaoJogos">
                        <CardGroup className="lista-group">
                            {
                                jogoFiltrado.map((item) => (
                        
                                    <ItemJogo key={item.id} data={item}/>
                                ))
                            }

                        </CardGroup>
                    </section> : <Loading/>
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

export default Home;