import React from "react";
import { useNavigate } from "react-router-dom"
//icones
import { FiArrowRight } from "react-icons/fi";
import professor from '../../assets/professor.png';
//estilos
import "./home.css";

//componentes
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import ItemJogo from "../../components/ItemJogo";
import Image    from 'react-bootstrap/Image';

;
const data = [
    1, 2, 3, 4, 5
]

const Home = () => {

    let navigate = useNavigate();

    function onClickItem(id:number){
        navigate(`/detalhes/${id}`);
    }

    return (
        <Container fluid className="container containerHome">

            <div className="apresentacao">
               <div className="containerApresentacao">
                <div className="apresentacaoTexto">
                    <h1>Bem vindo professor,</h1>
                    <p>agora você tem uma espaço para avaliar jogos digitais
                     educacionais e recomendá-los para outros professores.</p>
                    </div>
                    <Image src={professor} width={500} height={500}/>
               </div>
                
            </div>
            
            <section className="my-4 secaoJogos">
                <h2 >Jogos em Alta <FiArrowRight /></h2>
                <ul className="lista-group">
                    {
                        data.map((item, index) => (
                            <li key={index} onClick={()=>onClickItem(item)} className="me-3 my-2" style={{ backgroundColor: "transparent", border: 0, padding: 0, margin:0 }}>
                                <ItemJogo nomeJogo={item}/>
                            </li>
                        ))
                    }

                </ul>
            </section>

            <section className="my-4">
                <h2>Adicionados recentemente<FiArrowRight /></h2>
                <ul className="lista-group">
                    {
                        data.map((item,index) => (
                            <li key={index} onClick={()=>onClickItem(item)} className="me-3 my-2" style={{ backgroundColor: "transparent", border: 0, padding: 0 }}>
                                <ItemJogo nomeJogo={item}/>
                            </li>
                        ))
                    }

                </ul>
            </section>

        </Container>
    )
}

export default Home;