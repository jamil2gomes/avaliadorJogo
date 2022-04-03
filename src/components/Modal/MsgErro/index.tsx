import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ModalProps}  from 'react-bootstrap';


interface ModalMsgErroProps extends ModalProps{
 mensagem: string;
}

const MsgErro:React.FC<ModalMsgErroProps> = ({mensagem, onHide, ...rest}) =>{

    return (
        <Modal
        {...rest}
        size="lg"
        aria-labelledby="modal-erro"
        centered
      >
        <Modal.Header onHide={onHide} closeButton>
          <Modal.Title id="modal-erro">
           Ocorreu um erro!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {mensagem}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    )

}

export default MsgErro;