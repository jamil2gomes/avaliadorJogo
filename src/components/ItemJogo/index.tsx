import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import controle from '../../assets/jogogenerico.png';
import { JogoResumo } from "../../interfaces";
import './itemjogo.css';

const ItemJogo= ({data}:{data:JogoResumo}) => {
  let navigate = useNavigate();

    function onClickItem(id:number){
      navigate(`/detalhes/${id}`);
  }
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
          <Card.Img variant="top" alt={`Imagem do jogo ${data.nome}`} src={data.imagem_url ?? controle} width={180} height={180} />
          <Card.Body>
            <Card.Title as="h5">{data.nome}</Card.Title>
            <Card.Text>
              {new Date(data.data_lancamento).getFullYear()}
            </Card.Text>
          </Card.Body>
          <Card.Footer style={{backgroundColor:'transparent'}} className="d-flex flex-row-reverse">
          <Button 
            
            variant="indigo" 
            onClick={()=>onClickItem(data.id)}
            >
              Ver mais
            </Button>
          </Card.Footer>
        </Card>
        </>
    );
}

export default ItemJogo;