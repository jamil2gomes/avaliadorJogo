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
        <Modal.Header closeButton>
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
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )

}

export default MsgErro;