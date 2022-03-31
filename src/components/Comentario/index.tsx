

import './comentario.css';

const Comentario = ({autor, mensagem, data}:{autor:string, mensagem:string, data:string}) => {


  return (
    <>
    <div className="containerComentario">
      <h5>{autor}</h5>
      <p>{mensagem}</p>
      <span>Publicado em: {data}</span>
    </div>
    </>
  )
}

export default Comentario;
