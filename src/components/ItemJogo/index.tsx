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

const ItemJogo:React.FC<ItemJogoProps> = ({nomeJogo, anoJogo, id}) => {
    return(
        <>
         <Card className="itemJogo">
          <Card.Img variant="top" src={controle} width={200} height={200}/>
          <Card.Body>
            <Card.Title>{nomeJogo}</Card.Title>
            <Card.Text>
              {anoJogo}
            </Card.Text>
            <Button variant="success">Ver mais</Button>
          </Card.Body>
        </Card>
        </>
    );
}

export default ItemJogo;