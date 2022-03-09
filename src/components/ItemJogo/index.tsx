import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import controle from '../../assets/controle-jogo.png';
import './itemjogo.css';

interface ItemJogoProps {
    nomeJogo:string;
    anoJogo: number;
    id:number;
}

const ItemJogo:React.FC = () => {
    return(
        <>
         <Card className="itemJogo border border-light">
          <Card.Img variant="top" src={controle} />
          <Card.Body>
            <Card.Title>Nome do Jogo</Card.Title>
            <Card.Text>
              Ano
            </Card.Text>
            <Button variant="success">Ver mais</Button>
          </Card.Body>
        </Card>
        </>
    );
}

export default ItemJogo;