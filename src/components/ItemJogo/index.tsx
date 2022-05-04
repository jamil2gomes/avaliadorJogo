import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import controle from 'assets/jogogenerico.png';
import { JogoResumo } from "interfaces";
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
         <Card border="light" className="itemJogo">
          <Card.Img className="coverImage" alt={`Imagem do jogo ${data.nome}`} src={data.imagem_url ?? controle}/>
          <Card.Body>
            {data.nome.length > 16 ? `${data.nome.substring(0,16)}...`: data.nome}
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