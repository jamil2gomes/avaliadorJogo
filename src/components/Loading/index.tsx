import Spinner from "react-bootstrap/Spinner";
import './loading.css';


const Loading = () => {

    return (
        <div className="containerLoading">
        <Spinner animation="border" variant="info" role="status">
            <span className="visually-hidden">Carregando...</span>
        </Spinner>
        </div>
    )
}

export default Loading;