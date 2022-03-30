import React from 'react';
import Modal,{ModalProps} from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface MsgQuestionProps extends ModalProps{
    titulo:string;
    mensagem:string;
    confirmar:Function;
}

const MsgQuestion:React.FC<MsgQuestionProps> = ({titulo, mensagem, confirmar, onHide, ...rest}) => {


    return (
        <>
            <Modal 
            centered 
            aria-labelledby="contained-modal-title-vcenter"
            {...rest}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{titulo}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{mensagem}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                    <Button variant="success" onClick={()=>confirmar()}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MsgQuestion;