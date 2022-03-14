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

const ItemJogo= (props:any) => {


    return(
        <>
      <style type="text/css">
        {`
        .btn-indigo {
          background-color: indigo;
          color: white;
        }

        .btn-indigo:hover {
          color: white;
        }
        `}
      </style>
         <Card className="itemJogo border border-light">
          <Card.Img variant="top" src={controle} />
          <Card.Body>
            <Card.Title>{`Nome Jogo ${props.nomeJogo}`}</Card.Title>
            <Card.Text>
              Ano
            </Card.Text>
            <Button variant="indigo">Ver mais</Button>
          </Card.Body>
        </Card>
        </>
    );
}

export default ItemJogo;